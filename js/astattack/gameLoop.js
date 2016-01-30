(function(namespace) {
  var Game = LNXGdie.Game;
  var Controls = LNXGames.Controls;
  var AsteroidGraphics = LNXGdie.AsteroidGraphics;

  namespace.GameLoop = function() {
    var container = null;
    var renderer = null;
    var self = this;
    var game = null;
    var asteroidGraphics = null;

    this.start = function() {
      container = new PIXI.Container();
      asteroidGraphics = new AsteroidGraphics(container);
      renderer = PIXI.autoDetectRenderer(640, 480, {
        backgroundColor: 0x004020
      });
      document.body.appendChild(renderer.view);

      game = new Game(container);
      game.universe.listen("objectPushed", function(obj) {
        var sprite = new PIXI.Graphics();
        sprite.beginFill(0x995555);
        sprite.drawRect(0, 0, obj.width, obj.height);
        sprite.endFill();

        if(obj.type !== "weak") {
          container.addChild(sprite);
        }
        obj.listen("update", function() {
          sprite.x = this.x;
          sprite.y = 480-this.y;
        });
      });

      game.asteroid.listen("stateChange", function(state, directionX, directionY) {
        asteroidGraphics.changeAnimationToCompatibleWithState(state, directionX, directionY);
      });

      game.asteroid.physic().listen("update", function() {
        asteroidGraphics.update(this.x-10, 480-this.y);
      });

      game.init();
      requestAnimationFrame(self.update);
    };

    this.update = function() {
      requestAnimationFrame(self.update);

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
}(LNXGdie = window.LNXGdie || {}));
