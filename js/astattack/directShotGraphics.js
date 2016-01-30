(function(namespace) {
  var Animation = LNXGames.Animation;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.DirectShotGraphics = function(container, type) {
    var callbacks = Callbacks.initializeFor(this);
    var self = this;
    var animation = null;
    var tex = null;
    var sprite = null;
    var animations = null;
    var animationName = null;

    function init() {
      if(type == "linear")
        tex = PIXI.loader.resources["./img/cyan_radial.png"].texture.clone();
      else if(type == "circular")
        tex = PIXI.loader.resources["./img/cyan_ball.png"].texture.clone();
      else
        tex = PIXI.loader.resources["./img/red_ball.png"].texture.clone();
      
      sprite = new PIXI.Sprite(tex);
      animations = createAnimationsFor(sprite);
      animations["implode"].listen("animationEnd", function() {
        callbacks.emit("implodeAnimationEnd");
      });
      sprite.x = -9999;
      sprite.y = -9999;
      container.addChild(sprite);
    }

    this.update = function(x, y) {
      animations[animationName].toNextFrame(x, y);
    };

    this.destroy = function() {
      container.removeChild(sprite);
      sprite.destroy();
    }

    this.changeAnimationToCompatibleWithState = function(state) {
      self.changeAnimationTo(state);
    };
    
    this.changeAnimationTo = function(animName) {
      if(animationName !== animName) {
        animations[animName].reset();
      }
      animationName = animName;
    }

    function createAnimationsFor(sprite) {
      return {
        "flying" : new Animation(sprite, [
          {duration: 5, x: 0, y: 0, width: 10, height: 10}
        ]),
        "implode" : new Animation(sprite, [
          {duration: 5, x: 0, y: 0, width: 10, height: 10}
        ])
      };
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
