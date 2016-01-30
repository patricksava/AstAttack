(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;
  var Animation = LNXGames.Animation;

  namespace.AsteroidGraphics = function(container) {
    var callbacks = Callbacks.initializeFor(this);
    var self = this;
    var animation = null;
    var tex = null;
    var sprite = null;
    var animations = null;
    var animationName = null;

    function init() {
      tex = PIXI.loader.resources["./img/metroid2.png"].texture;
      sprite = new PIXI.Sprite(tex);
      animations = createAnimationsFor(sprite);
      animations["dead"].listen("animationEnd", function() {
        callbacks.emit("deadAnimationEnd");
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

    this.changeAnimationToCompatibleWithState = function(state, directionX, directionY) {
      var name = state === "dead" ? "dead" : "moving";
      self.changeAnimationTo(name);
    };
    
    this.changeAnimationTo = function(animName) {
      if(animationName !== animName) {
        animations[animName].reset();
      }
      animationName = animName;
    }

   var animmoving = [
      {duration: 5, x: 6   + 38*1, y: 435, width: 38, height: 45},
      {duration: 5, x: 6   + 38*2, y: 435, width: 38, height: 45},
      {duration: 5, x: 129 + 44*0, y: 435, width: 44, height: 45},
      {duration: 5, x: 129 + 44*1, y: 435, width: 44, height: 45},
      {duration: 5, x: 129 + 44*2, y: 435, width: 44, height: 45},
      {duration: 5, x: 252 + 47*0, y: 435, width: 47, height: 45},
      {duration: 5, x: 252 + 47*1, y: 435, width: 47, height: 45},
      {duration: 5, x: 252 + 47*2, y: 435, width: 47, height: 45},
      {duration: 5, x: 252 + 47*3, y: 435, width: 47, height: 45}
    ];

   var animdead = [
      {duration: 15, x: 6   + 38*1, y: 435, width: 38, height: 45},
      {duration: 15, x: 6   + 38*2, y: 435, width: 38, height: 45},
      {duration: 15, x: 129 + 44*0, y: 435, width: 44, height: 45},
      {duration: 15, x: 129 + 44*1, y: 435, width: 44, height: 45},
      {duration: 15, x: 129 + 44*2, y: 435, width: 44, height: 45},
      {duration: 15, x: 252 + 47*0, y: 435, width: 47, height: 45},
      {duration: 15, x: 252 + 47*1, y: 435, width: 47, height: 45},
      {duration: 15, x: 252 + 47*2, y: 435, width: 47, height: 45},
      {duration: 15, x: 252 + 47*3, y: 435, width: 47, height: 45}
    ];

    function createAnimationsFor(sprite) {
      return {
        "moving" : new Animation(sprite, animmoving),
        "standing": new Animation(sprite, animmoving),
        "dead": new Animation(sprite, animdead)
      };
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
