(function(namespace) {
  namespace.Timing = new function() {
    var timeouts = [];
    this.timeout = function(func, seconds) {
      var inx = timeouts.length;
      timeouts.push(setTimeout(function() {
        timeouts.splice(inx, 1);
        func();
      }, seconds*1000));
    };

    this.reset = function() {
      for(var i = 0; i < timeouts.length; i++) {
        clearInterval(timeouts[i]);
      }
    };
  };

}(LNXCommons = window.LNXCommons || {}));
