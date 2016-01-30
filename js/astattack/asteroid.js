(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.Asteroid = function(x, y) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var X_SPEED = 5;
    var Y_SPEED = 5;
    var physic = new SolidPhysicObject(x, y, 20, 47, "weak");
    var directionX = "right";
    var directionY = "up";
    var statesMachine = new StateMachine({
      start: "standing",
      states: {
        "moving" : {
          action: function() {
            if(directionX === "right") {
              physic.velocityX(X_SPEED);
            } else if(directionX === "left") {
              physic.velocityX(-1*X_SPEED);
            } else {
              physic.velocityX(0);
            }
            if(directionY === "up") {
              physic.velocityY(Y_SPEED);
            } else if(directionY === "down") {
              physic.velocityY(-1*Y_SPEED);
            } else {
              physic.velocityY(0);
            }
          },
          transitions: {
            "stop": "standing",
            "moveLeft": "moving",
            "moveRight": "moving",
            "moveUp": "moving",
            "moveDown": "moving"
          }
        },
        "standing" : {
          action: function() {
            physic.velocityX(0);
            physic.velocityY(0);

            directionX = null;
            directionY = null;
          },
          transitions: {
            "moveLeft": "moving",
            "moveRight": "moving",
            "moveUp": "moving",
            "moveDown": "moving"
          }
        }
        
      },
          
      passiveTransitions: [
        "stop", "shot"
      ],
      
      activeTransitions: {
        "moveRight": function() { directionX = "right"; },
        "moveLeft": function() { directionX = "left"; },
        "moveUp": function() { directionY = "up"; },
        "moveDown": function() { directionY = "down"; },
      }
    });

    this.init = function() {
      physic.listen("shot", function() {
        statesMachine.applyTransition("shot");
      });

      statesMachine.listen("stateChange", function(newState, transition, previousState) {
        callbacks.emit("stateChange", [newState, directionX, directionY]);
      });
      callbacks.emit("stateChange", [statesMachine.state(), directionX, directionY]);
    }

    this.act = function(action) {
      statesMachine.applyTransition(action);
    };

    this.update = function() {
      statesMachine.executeCurrentState();
    };

    this.physic = function(){ return physic; };
  };
}(LNXGdie = window.LNXGdie || {}));
