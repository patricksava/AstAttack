(function(namespace) {
  var Animation = LNXGames.Animation;
  var AnimationChain = LNXGames.AnimationChain;
  var Callbacks = LNXCommons.CallbackHelper;
  var Config = LNXGames.Config;

  namespace.EarthGraphics = function(container) {
    var callbacks = Callbacks.initializeFor(this);
    var self = this;
    var animation = null;
    var sprite = null;
    var animations = null;
    var animationName = null;
    var textures = {
      healthy: PIXI.loader.resources["./img/earth-light.png"].texture.clone(),
      fading: PIXI.loader.resources["./img/earth-fading.png"].texture.clone()
    }

    function init() {
      sprite = new PIXI.Sprite(textures["healthy"]);
      var val = Config.screenHeight() / 320.0;
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
      var healthyAnimation = new Animation(sprite, [
        {duration: 5, x: 426*0, y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*1, y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*2, y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*3, y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*0, y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*1, y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*2, y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*3, y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*0, y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*1, y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*2, y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*3, y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*0, y: 320*3, width: 426, height: 320}
      ], textures["healthy"]);
      var fadingAnimation = new Animation(sprite, [
        {duration: 5, x: 426*0, y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*1, y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*2, y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*3, y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*0, y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*1, y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*2, y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*3, y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*0, y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*1, y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*2, y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*3, y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*0, y: 320*3, width: 426, height: 320}
      ], textures["fading"])
      var darkAnimation = new Animation(sprite, [
        {duration: 5, x: 426*(4+0), y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*(4+1), y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*(4+2), y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*(4+3), y: 320*0, width: 426, height: 320},
        {duration: 5, x: 426*(4+0), y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*(4+1), y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*(4+2), y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*(4+3), y: 320*1, width: 426, height: 320},
        {duration: 5, x: 426*(4+0), y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*(4+1), y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*(4+2), y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*(4+3), y: 320*2, width: 426, height: 320},
        {duration: 5, x: 426*(4+0), y: 320*3, width: 426, height: 320}
      ], textures["fading"])

      return {
        "alive" : healthyAnimation,
        "explode" : new AnimationChain([
          {animation: fadingAnimation, times: 1},
          {animation: darkAnimation, times: 5}
        ])
      };
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
