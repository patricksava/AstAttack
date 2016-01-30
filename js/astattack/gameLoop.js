(function(namespace) {
  var Game = LNXAstAttack.Game;
  var Controls = LNXGames.Controls;
  var AsteroidGraphics = LNXAstAttack.AsteroidGraphics;
  var SpaceshipGraphics = LNXAstAttack.SpaceshipGraphics;
  var ShipController = LNXAstAttack.ShipController;
  var ShotController = LNXAstAttack.DirectShotController;
  var Config = LNXGames.Config;
  var SHIPS = {
    "300" : [[900, 200, "straight"]],
    "320" : [[900, 100, "straight"]],
    "340" : [[900, 220, "diagonal_up"]],
    "400" : [[900, 300, "diagonal_up"]],
    "200" : [[900, 300, "diagonal_down"]],
    "400" : [[900, 400, "diagonal_down"]],
  };

  namespace.GameLoop = function() {
    var container = null;
    var renderer = null;
    var self = this;
    var game = null;
    var asteroidGraphics = null;
    var spaceshipGraphics = null;
    var shipController = null;
    var shotController = null;
    var frameCount = 0;

    this.start = function() {
      frameCount = 0;
      container = new PIXI.Container();

      game = new Game(container);

      asteroidGraphics = new AsteroidGraphics(container);

      game.asteroid.listen("stateChange", function(state, directionX, directionY) {
        asteroidGraphics.changeAnimationToCompatibleWithState(state, directionX, directionY);
      });

      game.asteroid.listen("shipDestroyed", function() {
        game.score = game.score + 20;
      });

      game.asteroid.listen("lifeOver", function() {
        console.log("Game Over... but at least you still have your home Planet.");
        //TODO: talvez acabar a partida ou recomecar com outro asteroide
      });

      game.asteroid.physic().listen("update", function() {
        asteroidGraphics.update(this.x-10, Config.screenHeight()-this.y);
      });

      shotController = new ShotController(container, game.universe)
      shipController = new ShipController(container, game.universe, shotController);
      game.init();

      renderer = PIXI.autoDetectRenderer(Config.screenWidth(), Config.screenHeight(), {
        backgroundColor: 0x004020
      });
      document.body.appendChild(renderer.view);

      requestAnimationFrame(self.update);
    };

    this.update = function() {
      requestAnimationFrame(self.update);
      frameCount++;
      var ships = SHIPS[frameCount];
      if(ships) {
        for(var i = 0; i < ships.length; i++) {
          var params = ships[i];
          shipController.create(params[0], params[1], params[2], params[3]);
        }
      }

      //console.log("Score: " + game.score);
      //console.log("Asteroid HP: " + game.asteroid.healthPoints());
      shipController.updateAll();
      shotController.updateAll();

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
    };
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
