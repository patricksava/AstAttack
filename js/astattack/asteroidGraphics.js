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
      var direction = directionX+directionY;
      var name = animationNameFor(state, direction);
      //console.log(name);
      self.changeAnimationTo(name);
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

    var animleft = [
      {flip: true, duration: 5, x: 6   + 38*1, y: 435, width: 38, height: 45},
      {flip: true, duration: 5, x: 6   + 38*2, y: 435, width: 38, height: 45},
      {flip: true, duration: 5, x: 129 + 44*0, y: 435, width: 44, height: 45},
      {flip: true, duration: 5, x: 129 + 44*1, y: 435, width: 44, height: 45},
      {flip: true, duration: 5, x: 129 + 44*2, y: 435, width: 44, height: 45},
      {flip: true, duration: 5, x: 252 + 47*0, y: 435, width: 47, height: 45},
      {flip: true, duration: 5, x: 252 + 47*1, y: 435, width: 47, height: 45},
      {flip: true, duration: 5, x: 252 + 47*2, y: 435, width: 47, height: 45},
      {flip: true, duration: 5, x: 252 + 47*3, y: 435, width: 47, height: 45}
    ];

   var animright = [
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

    function createAnimationsFor(sprite) {
      return {
        "moving-left" : new Animation(sprite, animleft),
        "moving-right" : new Animation(sprite, animright),
        "moving-up" : new Animation(sprite, animleft),
        "moving-down" : new Animation(sprite, animleft),

        "moving-leftup" : new Animation(sprite, animleft),
        "moving-leftdown" : new Animation(sprite, animleft),
        "moving-rightup" : new Animation(sprite, animright),
        "moving-rightdown" : new Animation(sprite, animright),

        "standing-": new Animation(sprite, animright),
        "standing-up" : new Animation(sprite, animright),
        "standing-down" : new Animation(sprite, animright),

        "standing-left" : new Animation(sprite, animleft),
        "standing-right" : new Animation(sprite, animright),

        "standing-leftup" : new Animation(sprite, animleft),
        "standing-rightup" : new Animation(sprite, animright),

        "standing-leftdown" : new Animation(sprite, animleft),
        "standing-rightdown" : new Animation(sprite, animright)
      };
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
