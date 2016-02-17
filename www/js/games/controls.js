(function(namespace) {
  namespace.Controls = new function() {
    var KEYS = {
      '39': "right",
      '37': "left",
      '38': "up",
      '40': "down",
      '13': "enter"
    };

    var pressed = {};
    var activePressed = {};
    var activeReleased = {};

    window.addEventListener("touchstart", function(event) {
      event.preventDefault();
      computePress('13');
      var touch = event.touches[0];

      if(touch.pageX > 530) {  
        computePress('39');
        console.log("right");
      }else if(touch.pageX < 150) {
        computePress('37');
        console.log("left");
      } else if(touch.pageY < screen.height/2) {
        computePress('38');
        console.log("up");
      } else {
        computePress('40');
        console.log("down");
      }
    });

    window.addEventListener("touchend", function(event) {
      event.preventDefault();
      computeUnpress('13');
      var touch = event.changedTouches   [0];

      if(touch.pageX > 530) {     
        computeUnpress('39');
        console.log("releasing right");
      } else if(touch.pageX < 150) {
        computeUnpress('37');
        console.log("releasing left");
      } else if(touch.pageY < screen.height/2){
        computeUnpress('38');
        console.log("releasing up");
      } else{
        computeUnpress('40');
        console.log("releasing down");
      }
    });

    window.addEventListener("keydown", function(event) {
      if(KEYS.hasOwnProperty(keyCode)) {
        event.preventDefault();
        computePress(event.keyCode);
      }
    });

    window.addEventListener("keyup", function(event) {
      if(KEYS.hasOwnProperty(keyCode)) {
        event.preventDefault();
        computeUnpress(event.keyCode);
      }
    });

    var computePress = function(keyCode) {
      if(!pressed[KEYS[keyCode]]) {
        activePressed[KEYS[keyCode]] = true;
      }

      pressed[KEYS[keyCode]] = true;
      activeReleased[KEYS[keyCode]] = false;
    };

    var computeUnpress = function(keyCode) {
      pressed[KEYS[keyCode]] = false;
      activePressed[KEYS[keyCode]] = false;
      activeReleased[KEYS[keyCode]] = true;
    };

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
