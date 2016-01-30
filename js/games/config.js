(function(namespace) {
  namespace.Config = new function() {
    var self = this;
    var screenWidth = 0;
    var screenHeight = 0;

    this.screenWidth = function() {
      return screenWidth;
    };

    this.screenHeight = function() {
      return screenHeight;
    };

    this.screenSize = function(width, height) {
      screenWidth = width;
      screenHeight = height;
    };

    this.debug = function() {
      return window.location.search.toLowerCase().includes("debug");
    };
  };

  


}(LNXGames = window.LNXGames || {}));
