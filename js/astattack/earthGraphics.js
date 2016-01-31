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
      fading: PIXI.loader.resources["./img/earth-fading.png"].texture.clone(),
      sucked: PIXI.loader.resources["./img/earth-sucked.png"].texture.clone()
    }

    function init() {
      sprite = new PIXI.Sprite(textures["healthy"]);
      var val = (Config.screenHeight()*1.1) / 320.0;
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
        {duration: 10, x: 426*0, y: 320*0, width: 426, height: 320},
        {duration: 10, x: 426*1, y: 320*0, width: 426, height: 320},
        {duration: 10, x: 426*2, y: 320*0, width: 426, height: 320},
        {duration: 10, x: 426*3, y: 320*0, width: 426, height: 320},
        {duration: 10, x: 426*0, y: 320*1, width: 426, height: 320},
        {duration: 10, x: 426*1, y: 320*1, width: 426, height: 320},
        {duration: 10, x: 426*2, y: 320*1, width: 426, height: 320},
        {duration: 10, x: 426*3, y: 320*1, width: 426, height: 320},
        {duration: 10, x: 426*0, y: 320*2, width: 426, height: 320},
        {duration: 10, x: 426*1, y: 320*2, width: 426, height: 320},
        {duration: 10, x: 426*2, y: 320*2, width: 426, height: 320},
        {duration: 10, x: 426*3, y: 320*2, width: 426, height: 320},
        {duration: 10, x: 426*0, y: 320*3, width: 426, height: 320}
      ], textures["healthy"]);
      var fadingAnimation = new Animation(sprite, [
        {duration: 10, x: 426*0, y: 320*0, width: 426, height: 320},
        {duration: 10, x: 426*1, y: 320*0, width: 426, height: 320},
        {duration: 10, x: 426*2, y: 320*0, width: 426, height: 320},
        {duration: 10, x: 426*3, y: 320*0, width: 426, height: 320},
        {duration: 10, x: 426*0, y: 320*1, width: 426, height: 320},
        {duration: 10, x: 426*1, y: 320*1, width: 426, height: 320},
        {duration: 10, x: 426*2, y: 320*1, width: 426, height: 320},
        {duration: 10, x: 426*3, y: 320*1, width: 426, height: 320},
        {duration: 10, x: 426*0, y: 320*2, width: 426, height: 320},
        {duration: 10, x: 426*1, y: 320*2, width: 426, height: 320},
        {duration: 10, x: 426*2, y: 320*2, width: 426, height: 320},
        {duration: 10, x: 426*3, y: 320*2, width: 426, height: 320},
        {duration: 10, x: 426*0, y: 320*3, width: 426, height: 320}
      ], textures["fading"])
      var darkAnimation = new Animation(sprite, [
        {duration: 10, x: 426*(4+0), y: 320*0, width: 426, height: 320},
        {duration: 10, x: 426*(4+1), y: 320*0, width: 426, height: 320},
        {duration: 13, x: 426*(4+2), y: 320*0, width: 426, height: 320},
        {duration: 17, x: 426*(4+3), y: 320*0, width: 426, height: 320},
        {duration: 19, x: 426*(4+0), y: 320*1, width: 426, height: 320},
        {duration: 23, x: 426*(4+1), y: 320*1, width: 426, height: 320},
        {duration: 29, x: 426*(4+2), y: 320*1, width: 426, height: 320},
        {duration: 31, x: 426*(4+3), y: 320*1, width: 426, height: 320},
        {duration: 37, x: 426*(4+0), y: 320*2, width: 426, height: 320},
        {duration: 41, x: 426*(4+1), y: 320*2, width: 426, height: 320},
        {duration: 43, x: 426*(4+2), y: 320*2, width: 426, height: 320},
        {duration: 47, x: 426*(4+3), y: 320*2, width: 426, height: 320},
        {duration: 63, x: 426*(4+0), y: 320*3, width: 426, height: 320}
      ], textures["fading"])
      var suckedAnimation = new Animation(sprite, [
        {duration: 5, x: 434*0, y: 400*0, width: 434, height: 400},
        {duration: 5, x: 434*1, y: 400*0, width: 434, height: 400},
        {duration: 5, x: 434*2, y: 400*0, width: 434, height: 400},
        {duration: 5, x: 434*3, y: 400*0, width: 434, height: 400},
        {duration: 5, x: 434*0, y: 400*1, width: 434, height: 400},
        {duration: 5, x: 434*1, y: 400*1, width: 434, height: 400},
        {duration: 5, x: 434*2, y: 400*1, width: 434, height: 400},
        {duration: 5, x: 434*3, y: 400*1, width: 434, height: 400},
        {duration: 5, x: 434*0, y: 400*2, width: 434, height: 400},
        {duration: 5, x: 434*1, y: 400*2, width: 434, height: 400},
        {duration: 5, x: 434*2, y: 400*2, width: 434, height: 400},
        {duration: 5, x: 434*3, y: 400*2, width: 434, height: 400},
        {duration: 5, x: 434*0, y: 400*3, width: 434, height: 400},
        {duration: 5, x: 434*1, y: 400*3, width: 434, height: 400},
        {duration: 5, x: 434*2, y: 400*3, width: 434, height: 400},
        {duration: 5, x: 434*3, y: 400*3, width: 434, height: 400},
        {duration: 60, x: 0, y: 0, width: 1, height: 1}
      ], textures["sucked"])

      return {
        "alive" : healthyAnimation,
        "explode" : new AnimationChain([
          {animation: fadingAnimation, times: 1},
          {animation: darkAnimation, times: 1},
          {animation: suckedAnimation, times: 1}
        ])
      };
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
