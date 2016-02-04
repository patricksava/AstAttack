(function(namespace) {
  var Game = LNXAstAttack.Game;
  var Controls = LNXGames.Controls;
  var AsteroidGraphics = LNXAstAttack.AsteroidGraphics;
  var ShipController = LNXAstAttack.ShipController;
  var ShotController = LNXAstAttack.DirectShotController;
  var EarthController = LNXAstAttack.EarthController;
  var Config = LNXGames.Config;
  var Hud = LNXAstAttack.Hud;
  var Background = LNXAstAttack.Background;
  var Animation = LNXGames.Animation;

  var TIMELINE = [
    {
      start: -3,
      frequency: {
        "straight" : 3,
        "double" : 8,
      }
    },
    {
      start: 50,
      frequency: {
        "straight" : 3,
        "double" : 7,
        "spinner" : 10,
      }
    },
    {
      start: 100,
      frequency: {
        "straight" : 2,
        "double" : 3,
        "spinnerl2" : 10
      }
    },/*
    {
      start: 150,
      frequency: {
        "straight" : 2,
        "double" : 3,
        "spinner" : 5,
        "spinnerl2" : 7
      }
    },
    {
      start: 200,
      frequency: {
        "straight" : 2,
        "double" : 2,
        "spinner" : 3,
        "spinnerl2" : 7
      }
    },
    {
      start: 250,
      frequency: {
        "straight" : 3,
        "double" : 3,
        "spinner" : 2,
        "spinnerl2" : 2
      }
    },*/
    {
      start: 150,
      earth: true
    }
  ];

  namespace.SpaceScene = function(renderer, goToScene) {
    var self = this;
    var game = null;
    var asteroidGraphics = null;
    var spaceshipGraphics = null;
    var shipController = null;
    var shotController = null;
    var earthController = null;
    var container = null;
    var bgAudio = null;
    var hud = null;
    var background = null;

    var happenings = timelineToShips(TIMELINE);

    this.start = function() {
      container = new PIXI.Container();
      hud = new Hud();
      background = new Background();

      game = new Game(container);

      asteroidGraphics = new AsteroidGraphics(container);

      game.asteroid.listen("stateChange", function(state, directionX, directionY, invencible) {
        asteroidGraphics.changeAnimationToCompatibleWithState(state, directionX, directionY, invencible);
      });

      game.asteroid.listen("shipDestroyed", function(score) {
        game.score += score;
        container.addChild(Animation.textAnimation("+"+score, game.asteroid.x, Config.screenHeight() - game.asteroid.y));
      });

      game.asteroid.listen("earthHitted", function() {
        earthController.hit();
        destroyAsteroid();
      });

      game.asteroid.listen("dead", function() {
        asteroidGraphics.listen("deadAnimationEnd", function() {
          goToScene("losing");
          destroyAsteroid();
        });
      });

      if(Config.debug()) {
        game.universe.listen("objectPushed", function(obj) {
          var sprite = new PIXI.Graphics();
          sprite.beginFill(0x995555);
          sprite.drawRect(0, 0, obj.width, obj.height);
          sprite.endFill();
          sprite.alpha = 0.5;
          container.addChild(sprite);
          obj.listen("update", function() {
            sprite.x = this.x;
            sprite.y = Config.screenHeight()-this.y;
          });
        });
      }

      game.asteroid.physic().listen("update", function() {
        asteroidGraphics.update(this.x, Config.screenHeight()-this.y);
      });

      hud.addTo(container);
      background.addTo(container);

      bgAudio = new Audio("./audio/Centroid.ogg");
      
      bgAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      bgAudio.play();

      shotController = new ShotController(container, game.universe)
      shipController = new ShipController(container, game.universe, shotController);
      earthController = new EarthController(container, game.universe);
      game.init();
    };

    this.update = function(frameCount) {
      Animation.update();
      var happening = happenings[frameCount];
      if(happening) {
        if(happening === "earth") {
          earthController.create(finishScene);
        } else {
          shipController.create(happening[0], happening[1], happening[2]);
        }
      }

      //console.log("Score: " + game.score);
      //console.log("Asteroid HP: " + game.asteroid.healthPoints());
      shipController.updateAll();
      shotController.updateAll();
      earthController.update();

      hud.updateScore(game.score);
      hud.updateHP(game.asteroid.healthPoints(), game.asteroid.maxHP());
      background.update();

      var noMoves = true;
      if(Controls.isPressed("right")) {
        noMoves = false;
        game.asteroid.act("moveRight");
      }
      if(Controls.isPressed("left")) {
        noMoves = false;
        game.asteroid.act("moveLeft");
      }
      if(Controls.isPressed("up")) {
        noMoves = false;
        game.asteroid.act("moveUp");
      }
      if(Controls.isPressed("down")) {
        noMoves = false;
        game.asteroid.act("moveDown");
      }
      if(Controls.wasReleased("right") || Controls.wasReleased("left")) {
        game.asteroid.act("stopX");
      }
      if(Controls.wasReleased("down") || Controls.wasReleased("up")) {
        game.asteroid.act("stopY");
      }
      if(noMoves)
        game.asteroid.act("stop");

      game.update();
      renderer.render(container);

      if(Controls.wasReleased("enter")) {
        goToScene("start");
      }
    };

    this.destroy = function() {
      container.destroy();
      bgAudio.pause();
    };

    function destroyAsteroid() {
      game.universe.destroy(game.asteroid.physic());
      asteroidGraphics.destroy();
      bgAudio.pause();
    }

    function finishScene() {
      bgAudio.pause();
      goToScene("ending");
    }

    function timelineToShips(timeline) {
      var ships = {};
      for(var i = 0; i < timeline.length-1; i++) {
        var pack1 = timeline[i];
        var pack2 = timeline[i+1];
        for(var shipType in pack1.frequency) {
          var j = 1;
          var shipTime = (pack1.frequency[shipType]*60.0)*j + pack1.start*60;
          //console.log(shipTime);
          while(shipTime < pack2.start*60) {
            ships[shipTime] = [Config.screenWidth(), Config.screenHeight()*Math.random(), shipType];
            j++;
            shipTime = (pack1.frequency[shipType]*60.0)*j + pack1.start*60;
          }
        }
      }
      ships[timeline[timeline.length-1].start*60] = "earth";
      return ships;
    }
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
