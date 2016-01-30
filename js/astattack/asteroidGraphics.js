(function(namespace) {
  var Animation = LNXGames.Animation;

  namespace.AsteroidGraphics = function(container) {
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

    this.changeAnimationToCompatibleWithState = function(state, directionX, directionY) {
      var direction = directionX+directionY
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
        "moving" : "moving",
        "standing" : "standing"
      };

      return animationPrefix[state] + "-" + direction;
    };

    function createAnimationsFor(sprite) {
      return {
        "moving-left" : new Animation(sprite, [
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
        "moving-right" : new Animation(sprite, [
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
        "moving-up" : new Animation(sprite, [
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
        "moving-down" : new Animation(sprite, [
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

        "moving-leftup" : new Animation(sprite, [
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
        "moving-leftdown" : new Animation(sprite, [
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
        "moving-rightup" : new Animation(sprite, [
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
        "moving-rightdown" : new Animation(sprite, [
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

        "standing-up" : new Animation(sprite, [
          {duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),
        "standing-down" : new Animation(sprite, [
          {flip: true, duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),

        "standing-left" : new Animation(sprite, [
          {duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),
        "standing-right" : new Animation(sprite, [
          {flip: true, duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),

        "standing-leftup" : new Animation(sprite, [
          {duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),
        "standing-rightup" : new Animation(sprite, [
          {flip: true, duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),

        "standing-leftdown" : new Animation(sprite, [
          {duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),
        "standing-rightdown" : new Animation(sprite, [
          {flip: true, duration: 5, x: 24 , y: 785, width: 35, height: 48}
        ]),
      };
    }
    
    init();
  };
}(LNXGdie = window.LNXGdie || {}));
