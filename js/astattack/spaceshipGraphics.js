(function(namespace) {
  var Animation = LNXGames.Animation;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.SpaceshipGraphics = function(container, type) {
    var callbacks = Callbacks.initializeFor(this);
    var self = this;
    var animation = null;
    var tex = null;
    var sprite = null;
    var animations = null;
    var animationName = null;
    var graphType = type;

    function init() {
      switch (type) {
        case "straight":
          tex = PIXI.loader.resources["./img/spaceship.pod.1.small.blue.png"].texture.clone();
          break;
        case "double": 
          tex = PIXI.loader.resources["./img/spaceship.pod.1.small.red.png"].texture.clone();
          break;
        case "spinner":
          tex = PIXI.loader.resources["./img/spinner.png"].texture.clone();
          break;
        case "spinnerl2":
          tex = PIXI.loader.resources["./img/spinnerl2.png"].texture.clone();
          break;
        default:
          tex = PIXI.loader.resources["./img/metroid2.png"].texture.clone();
      }
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
      if(graphType != "spinner" && graphType != "spinnerl2"){
        return {
          "moving" : new Animation(sprite, [
            {duration: 1000, x: 0  , y: 0, width: 40, height: 45}
          ]),

          "exploding" : new Animation(sprite, [
            {duration: 1000, x: 0  , y: 0, width: 40, height: 45}
          ]),
        };
      } else {
        return {
          "moving" : new Animation(sprite, [
            {duration: 15, x: 0  , y: 0, width: 70, height: 70},
            {duration: 15, x: 70  , y: 0, width: 70, height: 70},
            {duration: 15, x: 140  , y: 0, width: 70, height: 70},
            {duration: 15, x: 210  , y: 0, width: 70, height: 70},
            {duration: 15, x: 280  , y: 0, width: 70, height: 70},
            {duration: 15, x: 350  , y: 0, width: 70, height: 70},
            {duration: 15, x: 420  , y: 0, width: 70, height: 70},
            {duration: 15, x: 490  , y: 0, width: 70, height: 70}
          ]),

          "exploding" : new Animation(sprite, [
            {duration: 15, x: 0  , y: 0, width: 70, height: 70},
          ]),
        };
      }
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
