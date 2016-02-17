(function(namespace) {
  var Animation = LNXGames.Animation;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.SpaceshipGraphics = function(container, type) {
    var callbacks = Callbacks.initializeFor(this);
    var self = this;
    var animation = null;
    var tex = null;
    var explotex = null;
    var sprite = null;
    var explodingSprite = null;
    var animations = null;
    var animationName = null;
    var graphType = type;

    function init() {
      switch (type) {
        case "straight":
          tex = PIXI.loader.resources["./img/spaceship.pod.1.small.blue.png"].texture.clone();
          explotex = PIXI.loader.resources["./img/explosion/explosion_01_strip13_small.png"].texture.clone();
          break;
        case "double": 
          tex = PIXI.loader.resources["./img/spaceship.pod.1.small.red.png"].texture.clone();
          explotex = PIXI.loader.resources["./img/explosion/explosion_01_strip13_small.png"].texture.clone();
          break;
        case "spinner":
          tex = PIXI.loader.resources["./img/spinner.png"].texture.clone();
          explotex = PIXI.loader.resources["./img/explosion/explosion_01_strip13_medium.png"].texture.clone();
          break;
        case "spinnerl2":
          tex = PIXI.loader.resources["./img/spinnerl2.png"].texture.clone();
          explotex = PIXI.loader.resources["./img/explosion/explosion_01_strip13_medium.png"].texture.clone();
          break;
        default:
          tex = PIXI.loader.resources["./img/spaceship.pod.1.small.yellow.png"].texture.clone();
          explotex = PIXI.loader.resources["./img/explosion/explosion_01_strip13_small.png"].texture.clone();
          break;
      }
      sprite = new PIXI.Sprite(tex);
      explodingSprite = new PIXI.Sprite(explotex);
      animations = createAnimationsFor(sprite, explodingSprite);
      animations["exploding"].listen("animationEnd", function() {
        callbacks.emit("explodingEnd");
      });
      sprite.x = -9999;
      sprite.y = -9999;
      explodingSprite.x = -9999;
      explodingSprite.y = -9999;
      container.addChild(sprite);
      container.addChild(explodingSprite);
    }

    this.update = function(x, y) {
      animations[animationName].toNextFrame(x, y);
    };

    this.destroy = function() {
      container.removeChild(sprite);
      container.removeChild(explodingSprite);
      sprite.destroy();
      explodingSprite.destroy();
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

    function createAnimationsFor(sprite, explodingSprite) {
      if(graphType != "spinner" && graphType != "spinnerl2"){
        return {
          "moving" : new Animation(sprite, [
            {duration: 1000, x: 0  , y: 0, width: 40, height: 45}
          ]),

          "exploding" : new Animation(explodingSprite, [
            {duration: 4, x: 0, y: 0, width: 40, height: 40},
            {duration: 4, x: 40, y: 0, width: 40, height: 40},
            {duration: 4, x: 80, y: 0, width: 40, height: 40},
            {duration: 4, x: 120, y: 0, width: 40, height: 40},
            {duration: 4, x: 160, y: 0, width: 40, height: 40},
            {duration: 4, x: 200, y: 0, width: 40, height: 40},
            {duration: 4, x: 240, y: 0, width: 40, height: 40},
            {duration: 4, x: 280, y: 0, width: 40, height: 40},
            {duration: 4, x: 320, y: 0, width: 40, height: 40},
            {duration: 4, x: 360, y: 0, width: 40, height: 40},
            {duration: 4, x: 400, y: 0, width: 40, height: 40},
            {duration: 4, x: 440, y: 0, width: 40, height: 40},
            {duration: 4, x: 480, y: 0, width: 40, height: 40}
          ]),
        };
      } else {
        return {
          "moving" : new Animation(sprite, [
            {duration: 10, x: 490 , y: 0, width: 70, height: 70},
            {duration: 10, x: 420 , y: 0, width: 70, height: 70},
            {duration: 10, x: 350 , y: 0, width: 70, height: 70},
            {duration: 10, x: 280 , y: 0, width: 70, height: 70},
            {duration: 10, x: 210 , y: 0, width: 70, height: 70},
            {duration: 10, x: 140 , y: 0, width: 70, height: 70},
            {duration: 10, x: 70  , y: 0, width: 70, height: 70},
            {duration: 10, x: 0   , y: 0, width: 70, height: 70}
          ]),

          "exploding" : new Animation(explodingSprite, [
            {duration: 4, x: 0, y: 0, width: 70, height: 70},
            {duration: 4, x: 70, y: 0, width: 70, height: 70},
            {duration: 4, x: 140, y: 0, width: 70, height: 70},
            {duration: 4, x: 210, y: 0, width: 70, height: 70},
            {duration: 4, x: 280, y: 0, width: 70, height: 70},
            {duration: 4, x: 350, y: 0, width: 70, height: 70},
            {duration: 4, x: 420, y: 0, width: 70, height: 70},
            {duration: 4, x: 490, y: 0, width: 70, height: 70},
            {duration: 4, x: 560, y: 0, width: 70, height: 70},
            {duration: 4, x: 630, y: 0, width: 70, height: 70},
            {duration: 4, x: 700, y: 0, width: 70, height: 70},
            {duration: 4, x: 770, y: 0, width: 70, height: 70},
            {duration: 4, x: 840, y: 0, width: 70, height: 70}
          ]),
        };
      }
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
