(function(namespace) {
  namespace.Controls = new function() {
    var KEYS = {
      '39': "right",
      '37': "left",
      '38': "up"
    };

    var pressed = {};
    var activePressed = {};
    var activeReleased = {};

    window.addEventListener("keydown", function(event) {
      if(KEYS.hasOwnProperty(event.keyCode)) {
        event.preventDefault();

        if(!pressed[KEYS[event.keyCode]]) {
          activePressed[KEYS[event.keyCode]] = true;
        }

        pressed[KEYS[event.keyCode]] = true;
        activeReleased[KEYS[event.keyCode]] = false;
      }

    });

    window.addEventListener("keyup", function(event) {
      if(KEYS.hasOwnProperty(event.keyCode)) {
        event.preventDefault();
        pressed[KEYS[event.keyCode]] = false;
        activePressed[KEYS[event.keyCode]] = false;
        activeReleased[KEYS[event.keyCode]] = true;
      }

    });

    this.isPressed = function(keyName) {
      return pressed[keyName];
    };

    this.isReleased = function(keyName) {
      return !this.isPressed(keyName);
    };

    this.wasReleased = function(keyName) {
      var wasReleased = activeReleased[keyName];
      activeReleased[keyName] = false;
      return wasReleased;
    };

    this.wasPressed = function(keyName) {
      var wasPressed = activePressed[keyName];
      activePressed[keyName] = false;
      return wasPressed;
    };
  };
}(LNXGames = window.LNXGames || {}));
