(function(namespace) {
  var Animation = LNXGames.Animation;

  namespace.DirectShotGraphics = function(container) {
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
      sprite.x = -9999;
      sprite.y = -9999;
      container.addChild(sprite);
    }

    this.update = function(x, y) {
      animations[animationName].toNextFrame(x, y);
    };

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
        "flying" : new Animation(sprite, [
          {duration: 5, x: 6   + 38*1, y: 435, width: 25, height: 15},
          {duration: 5, x: 6   + 38*2, y: 435, width: 25, height: 15},
          {duration: 5, x: 129 + 44*0, y: 435, width: 25, height: 15},
          {duration: 5, x: 129 + 44*1, y: 435, width: 25, height: 15},
          {duration: 5, x: 129 + 44*2, y: 435, width: 25, height: 15},
          {duration: 5, x: 252 + 47*0, y: 435, width: 25, height: 15},
          {duration: 5, x: 252 + 47*1, y: 435, width: 25, height: 15},
          {duration: 5, x: 252 + 47*2, y: 435, width: 25, height: 15},
          {duration: 5, x: 252 + 47*3, y: 435, width: 25, height: 15}
        ]),
        "implode" : new Animation(sprite, [
          {flip: true, duration: 5, x: 6   + 38*1, y: 435, width: 25, height: 25},
          {flip: true, duration: 5, x: 6   + 38*2, y: 435, width: 25, height: 25},
          {flip: true, duration: 5, x: 129 + 44*0, y: 435, width: 25, height: 25},
          {flip: true, duration: 5, x: 129 + 44*1, y: 435, width: 25, height: 25},
          {flip: true, duration: 5, x: 129 + 44*2, y: 435, width: 25, height: 25},
          {flip: true, duration: 5, x: 252 + 47*0, y: 435, width: 25, height: 25},
          {flip: true, duration: 5, x: 252 + 47*1, y: 435, width: 25, height: 25},
          {flip: true, duration: 5, x: 252 + 47*2, y: 435, width: 25, height: 25},
          {flip: true, duration: 5, x: 252 + 47*3, y: 435, width: 25, height: 25}
        ])
      };
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
