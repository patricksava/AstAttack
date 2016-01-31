(function(namespace) {
  var Game = LNXAstAttack.Game;
  var Controls = LNXGames.Controls;
  var AsteroidGraphics = LNXAstAttack.AsteroidGraphics;
  var ShipController = LNXAstAttack.ShipController;
  var ShotController = LNXAstAttack.DirectShotController;
  var EarthController = LNXAstAttack.EarthController;
  var Config = LNXGames.Config;
  var TIMELINE = [
    {
      start: -3,
      frequency: {
        "straight" : 4,
        "double" : 5,
        "spinner" : 6,
        "spinnerl2" : 7
      }
    },
    {
      start: 10,
      frequency: {
        "straight" : 2,
        "double" : 2.5,
        "spinner" : 3,
        "spinnerl2" : 3.5
      }
    },
    {
      start: 20,
      frequency: {
        "straight" : 2,
        //"double" : 5
      }
    },
    {
      start: 30,
      earth: true
    }
  ];

  var BGWIDTH = 2393;
  var BGHEIGHT = 600;
  var BGSPEED = -3;

  namespace.SpaceScene = function(renderer, goToScene) {
    var self = this;
    var game = null;
    var asteroidGraphics = null;
    var spaceshipGraphics = null;
    var shipController = null;
    var shotController = null;
    var earthController = null;
    var container = null;
    var scoreLabel = null;
    var hpLabel = null;
    var backgroundI = 0;
    var background1 = null;
    var background2 = null;

    var happenings = timelineToShips(TIMELINE);

    this.start = function() {
      container = new PIXI.Container();

      game = new Game(container);

      asteroidGraphics = new AsteroidGraphics(container);

      game.asteroid.listen("stateChange", function(state, directionX, directionY) {
        asteroidGraphics.changeAnimationToCompatibleWithState(state, directionX, directionY);
      });

      game.asteroid.listen("shipDestroyed", function() {
        game.score = game.score + 20;
      });

      game.asteroid.listen("earthHitted", function() {
        earthController.hit();
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
        asteroidGraphics.update(this.x-10, Config.screenHeight()-this.y);
      });

      var bgTexture = PIXI.loader.resources["./img/space.jpg"].texture.clone(),
      backgroundI = 0;
      background1 = new PIXI.Sprite(bgTexture);
      background2 = new PIXI.Sprite(bgTexture);
      background1.y = 0;
      background2.y = 0;
      container.addChildAt(background1, 0);
      container.addChildAt(background2, 0);

      scoreLabel = new PIXI.Text("Score: " + game.score + " ", {font : '20px Monospaced', fill : 0xffffff, lineHeight: 30});
      scoreLabel.anchor.x = 1.0;
      scoreLabel.anchor.y = 0.0;
      scoreLabel.x = Config.screenWidth();
      scoreLabel.y = 0;
      container.addChild(scoreLabel);

      hpLabel = new PIXI.Text("HP: " + game.asteroid.healthPoints() + "/" + game.asteroid.maxHP(), {font : '20px Monospaced', fill : 0xffffff, lineHeight: 30});
      hpLabel.anchor.x = 0.0;
      hpLabel.anchor.y = 0.0;
      hpLabel.x = 0.5;
      hpLabel.y = 0.5;
      container.addChild(hpLabel);

      shotController = new ShotController(container, game.universe)
      shipController = new ShipController(container, game.universe, shotController);
      earthController = new EarthController(container, game.universe);
      game.init();
    };

    this.update = function(frameCount) {
      backgroundI = (backgroundI + BGSPEED) % BGWIDTH;
      background1.x = backgroundI;
      background2.x = backgroundI + BGWIDTH;

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

      scoreLabel.text = "Score: " + game.score + " ";
      hpLabel.text = "HP: " + game.asteroid.healthPoints() + "/" + game.asteroid.maxHP();

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
    };

    function destroyAsteroid() {
      game.universe.destroy(game.asteroid.physic());
      asteroidGraphics.destroy();
    }

    function finishScene() {
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


  // var SHIPS = {
  //   "300" : [[900, 200, "straight"]],
  //   "320" : [[900, 100, "straight"]],
  //   "340" : [[900, 220, "diagonal_up"]],
  //   "400" : [[900, 300, "diagonal_up"]],
  //   "200" : [[900, 300, "diagonal_down"]],
  //   "400" : [[900, 400, "diagonal_down"]],
  //   "1400" :  ["earth"]
  // };
}(LNXAstAttack = window.LNXAstAttack || {}));
