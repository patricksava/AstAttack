(function(namespace) {
  var Animation = LNXGames.Animation;

  namespace.HeroGraphics = function(container) {
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
      sprite.x = -9999;
      sprite.y = -9999;
      container.addChild(sprite);
    }

    this.update = function(x, y) {
      animations[animationName].toNextFrame(x, y);
    };

    this.changeAnimationToCompatibleWithState = function(state, direction) {
      self.changeAnimationTo(animationNameFor(state, direction));
    };
    
    this.changeAnimationTo = function(animName) {
      if(animationName !== animName) {
        animations[animName].reset();
      }
      animationName = animName;
    }

    function animationNameFor(state, direction) {
      var animationPrefix = {
        "running" : "running",
        "standing" : "standing",
        "jumping-moving" : "jumping",
        "jumping-still" : "jumping",
        "on-the-air-moving" : "jumping",
        "on-the-air-still" : "jumping",
        "falling-moving" : "jumping",
        "falling-still" : "jumping"
      };

      return animationPrefix[state] + "-" + direction;
    };

    function createAnimationsFor(sprite) {
      return {
        "running-left" : new Animation(sprite, [
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
        "running-right" : new Animation(sprite, [
          {flip: true, duration: 2, x: 7  , y: 540, width: 45, height: 49},
          {flip: true, duration: 2, x: 7 + 45 , y: 540, width: 45, height: 49},
          {flip: true, duration: 2, x: 7 + 90 , y: 544, width: 45, height: 49},
          {flip: true, duration: 2, x: 7 + 147, y: 544, width: 44, height: 49},
          {flip: true, duration: 2, x: 7 + 188, y: 544, width: 45, height: 49},
          {flip: true, duration: 2, x: 7 + 241, y: 544, width: 40, height: 49},
          {flip: true, duration: 2, x: 7 + 275, y: 542, width: 45, height: 49},
          {flip: true, duration: 2, x: 7 + 315, y: 540, width: 45, height: 49},
          {flip: true, duration: 2, x: 7 + 360, y: 540, width: 45, height: 49},
          {flip: true, duration: 2, x: 7 + 405, y: 540, width: 45, height: 49}
        ]),
        "standing-left" : new Animation(sprite, [
          {duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),
        "standing-right" : new Animation(sprite, [
          {flip: true, duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),
        "jumping-right" : new Animation(sprite, [
          {duration: 5, x: 6   + 38*1, y: 435, width: 38, height: 45},
          {duration: 5, x: 6   + 38*2, y: 435, width: 38, height: 45},
          {duration: 5, x: 129 + 44*0, y: 435, width: 44, height: 45},
          {duration: 5, x: 129 + 44*1, y: 435, width: 44, height: 45},
          {duration: 5, x: 129 + 44*2, y: 435, width: 44, height: 45},
          {duration: 5, x: 252 + 47*0, y: 435, width: 47, height: 45},
          {duration: 5, x: 252 + 47*1, y: 435, width: 47, height: 45},
          {duration: 5, x: 252 + 47*2, y: 435, width: 47, height: 45},
          {duration: 5, x: 252 + 47*3, y: 435, width: 47, height: 45}
        ]),
        "jumping-left" : new Animation(sprite, [
          {flip: true, duration: 5, x: 6   + 38*1, y: 435, width: 38, height: 45},
          {flip: true, duration: 5, x: 6   + 38*2, y: 435, width: 38, height: 45},
          {flip: true, duration: 5, x: 129 + 44*0, y: 435, width: 44, height: 45},
          {flip: true, duration: 5, x: 129 + 44*1, y: 435, width: 44, height: 45},
          {flip: true, duration: 5, x: 129 + 44*2, y: 435, width: 44, height: 45},
          {flip: true, duration: 5, x: 252 + 47*0, y: 435, width: 47, height: 45},
          {flip: true, duration: 5, x: 252 + 47*1, y: 435, width: 47, height: 45},
          {flip: true, duration: 5, x: 252 + 47*2, y: 435, width: 47, height: 45},
          {flip: true, duration: 5, x: 252 + 47*3, y: 435, width: 47, height: 45}
        ])
      };
    }
    
    init();
  };
}(LNXGdie = window.LNXGdie || {}));
