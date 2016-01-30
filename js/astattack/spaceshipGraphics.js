(function(namespace) {
  var Animation = LNXGames.Animation;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.SpaceshipGraphics = function(container) {
    var callbacks = Callbacks.initializeFor(this);
    var self = this;
    var animation = null;
    var tex = null;
    var sprite = null;
    var animations = null;
    var animationName = null;

    function init() {
      tex = PIXI.loader.resources["./img/metroid2.png"].texture.clone();
      sprite = new PIXI.Sprite(tex);
      animations = createAnimationsFor(sprite);
      animations["exploding"].listen("animationEnd", function() {
        callbacks.emit("explodingEnd");
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
      if(state !== "dead")
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
        "moving" : new Animation(sprite, [
          {duration: 2, x: 7  , y: 540, width: 45, height: 49},
          {duration: 2, x: 7 + 45 , y: 540, width: 45, height: 49},
          {duration: 2, x: 7 + 90 , y: 544, width: 45, height: 49},
          {duration: 2, x: 7 + 147, y: 544, width: 44, height: 49},
          {duration: 2, x: 7 + 188, y: 544, width: 45, height: 49},
          {duration: 2, x: 7 + 241, y: 544, width: 40, height: 49},
          {duration: 2, x: 7 + 275, y: 542, width: 45, height: 49},
          {duration: 2, x: 7 + 315, y: 540, width: 45, height: 49},
          {duration: 2, x: 7 + 360, y: 540, width: 45, height: 49},
          {duration: 2, x: 7 + 405, y: 540, width: 45, height: 49}
        ]),

        "exploding" : new Animation(sprite, [
          {duration: 10, x: 7  , y: 540, width: 45, height: 49},
          {duration: 10, x: 7 + 45 , y: 540, width: 45, height: 49},
          {duration: 10, x: 7 + 90 , y: 544, width: 45, height: 49},
          {duration: 10, x: 7 + 147, y: 544, width: 44, height: 49},
          {duration: 10, x: 7 + 188, y: 544, width: 45, height: 49},
          {duration: 10, x: 7 + 241, y: 544, width: 40, height: 49},
          {duration: 10, x: 7 + 275, y: 542, width: 45, height: 49},
          {duration: 10, x: 7 + 315, y: 540, width: 45, height: 49},
          {duration: 10, x: 7 + 360, y: 540, width: 45, height: 49},
          {duration: 10, x: 7 + 405, y: 540, width: 45, height: 49}
        ]),
      };
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
