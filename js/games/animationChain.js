(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.AnimationChain = function(animations) {
    var callbacks = Callbacks.initializeFor(this);
    var currentAnimationIndex = 0;
    var animationTimes = animations[currentAnimationIndex].times;

    for(var i = 0; i < animations.length; i++) {
      animations[i].animation.listen("animationEnd", function() {
        animationTimes -= 1;
        if(animationTimes <= 0) {
          nextAnimation();
          animationTimes = animations[currentAnimationIndex].times;
        }
      });
    }

    this.toNextFrame = function(x, y) {
      var animation = animations[currentAnimationIndex].animation;
      animation.toNextFrame(x, y);
    };

    this.reset = function() {
      currentAnimationIndex = 0;
      animationTimes = animations[currentAnimationIndex].times;
    };

    function nextAnimation() {
      currentAnimationIndex += 1;
      if(currentAnimationIndex === animations.length) {
        callbacks.emit("animationEnd");
      }
      currentAnimationIndex = currentAnimationIndex % animations.length;
    }
  };
}(LNXGames = window.LNXGames || {}));
