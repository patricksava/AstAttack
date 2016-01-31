(function(namespace) {
  namespace.Config = new function() {
    var AUDIOS = {
      explode: new Audio("./audio/explode.wav"),
      shot: new Audio("./audio/Longshot.mp3"),
      bg: new Audio("./audio/Centroid.ogg"),
      hit: new Audio("./audio/glass_breaking.wav")
    };
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

    this.play = function(name) {
      AUDIOS[name].play();
    };

    this.debug = function() {
      return window.location.search.toLowerCase().includes("debug");
    };
  };

  


}(LNXGames = window.LNXGames || {}));
