(function(namespace) {
  var MAX_FRAME = 60*60*60*24*7; // 60*60*60*24*7 frames => 1 week
  namespace.Timing = new function() {
    var frame = 0;
    var scheduled = [];
    this.timeout = function(func, seconds) {
      scheduled.push({
        frame: frame + seconds*60,
        action: func
      });
      scheduled.sort(compareSchedules);
    };

    this.reset = function() {
      scheduled = [];
    };

    requestAnimationFrame(update);
    function update() {
      requestAnimationFrame(update);
      
      frame = (frame + 1) % MAX_FRAME;
      while(scheduled.length > 0 && (scheduled[0].frame % MAX_FRAME) <= frame) {
        scheduled[0].action();
        scheduled.splice(0,1);
      }
    }

    function compareSchedules(s1, s2) {
      return s1.frame > s2.frame;
    }
  };

}(LNXCommons = window.LNXCommons || {}));
