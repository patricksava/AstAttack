(function(namespace) {
  var Game = LNXGdie.Game;
  var Controls = LNXGames.Controls;
  var SamusGraphics = LNXGdie.HeroGraphics;

  namespace.GameLoop = function() {
    var container = null;
    var renderer = null;
    var self = this;
    var game = null;
    var samusGraphics = null;

    this.start = function() {
      container = new PIXI.Container();
      samusGraphics = new SamusGraphics(container);
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

      game.samus.listen("stateChange", samusGraphics.changeAnimationToCompatibleWithState);

      game.samus.physic().listen("update", function() {
        samusGraphics.update(this.x-10, 480-this.y);
      });

      game.init();
      requestAnimationFrame(self.update);
    };

    this.update = function() {
      requestAnimationFrame(self.update);

      var rightWasReleased = Controls.wasReleased("right");
      var leftWasReleased = Controls.wasReleased("left");
      if((rightWasReleased && Controls.isReleased("left")) ||
         (leftWasReleased && Controls.isReleased("right"))) {
        game.samus.act("stop");
      }

      if(Controls.wasPressed("right") ||
          (Controls.isPressed("right") && leftWasReleased)) {
        game.samus.act("moveRight");
      } else if(Controls.wasPressed("left") ||
          (Controls.isPressed("left") && rightWasReleased)) {
        game.samus.act("moveLeft");
      }

      if(Controls.wasPressed("up")) {
        game.samus.act("jump");
      }

      if(Controls.wasReleased("up")) {
        game.samus.act("fall");
      }

      game.update();
      renderer.render(container);
    };
  };
}(LNXGdie = window.LNXGdie || {}));
