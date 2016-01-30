(function(namespace) {
  var Animation = LNXGames.Animation;
  var Callbacks = LNXCommons.CallbackHelper;
  var Config = LNXGames.Config;

  namespace.EarthGraphics = function(container) {
    var callbacks = Callbacks.initializeFor(this);
    var self = this;
    var animation = null;
    var tex = null;
    var sprite = null;
    var animations = null;
    var animationName = null;

    function init() {
      tex = PIXI.loader.resources["./img/earth.png"].texture.clone();
      sprite = new PIXI.Sprite(tex);
      var val = Config.screenHeight() / 160.0;
      sprite.scale.x = val;
      sprite.scale.y = val;
      animations = createAnimationsFor(sprite);
      animations["explode"].listen("animationEnd", function() {
        callbacks.emit("explodeAnimationEnd");
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
        "alive" : new Animation(sprite, [
          {duration: 5, x: 213*0, y: 160*0, width: 213, height: 160},
          {duration: 5, x: 213*1, y: 160*0, width: 213, height: 160},
          {duration: 5, x: 213*2, y: 160*0, width: 213, height: 160},
          {duration: 5, x: 213*3, y: 160*0, width: 213, height: 160},
          {duration: 5, x: 213*0, y: 160*1, width: 213, height: 160},
          {duration: 5, x: 213*1, y: 160*1, width: 213, height: 160},
          {duration: 5, x: 213*2, y: 160*1, width: 213, height: 160},
          {duration: 5, x: 213*3, y: 160*1, width: 213, height: 160},
          {duration: 5, x: 213*0, y: 160*2, width: 213, height: 160},
          {duration: 5, x: 213*1, y: 160*2, width: 213, height: 160},
          {duration: 5, x: 213*2, y: 160*2, width: 213, height: 160},
          {duration: 5, x: 213*3, y: 160*2, width: 213, height: 160},
          {duration: 5, x: 213*0, y: 160*3, width: 213, height: 160}
        ]),
        "explode" : new Animation(sprite, [
          {duration: 1, x: 213*0, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*3, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*3, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*3, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*3, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*3, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*3, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*0, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*1, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*3, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*1, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*2, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*3, y: 160*2, width: 200, height: 150},
          {duration: 1, x: 213*0, y: 160*3, width: 200, height: 150}
        ])
      };
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
