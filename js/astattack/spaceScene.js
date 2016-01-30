(function(namespace) {
  var Game = LNXAstAttack.Game;
  var Controls = LNXGames.Controls;
  var AsteroidGraphics = LNXAstAttack.AsteroidGraphics;
  var SpaceshipGraphics = LNXAstAttack.SpaceshipGraphics;
  var ShipController = LNXAstAttack.ShipController;
  var ShotController = LNXAstAttack.DirectShotController;
  var EarthController = LNXAstAttack.EarthController;
  var Config = LNXGames.Config;
  var TIMELINE = [
    {
      start: 0,
      frequency: {
        "straight" : 4,
      }
    },
    {
      start: 10,
      frequency: {
        "straight" : 2.87,
        "diagonal_up" : 8,
        "diagonal_down" : 8,
      }
    },
    {
      start: 20,
      frequency: {
        "straight" : 2,
        "diagonal_up" : 5,
        "diagonal_down" : 5,
      }
    },
    {
      start: 30,
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

    var happenings = timelineToShips(TIMELINE);
    //console.log(happenings);

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

      game.asteroid.physic().listen("update", function() {
        asteroidGraphics.update(this.x-10, Config.screenHeight()-this.y);
      });

      shotController = new ShotController(container, game.universe)
      shipController = new ShipController(container, game.universe, shotController);
      earthController = new EarthController(container, game.universe);
      game.init();
    };

    this.update = function(frameCount) {
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
