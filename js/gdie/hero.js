(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.Hero = function(x, y) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var RUNNING_VEL = 5;
    var JUMPING_VEL = 2;
    var physic = new SolidPhysicObject(x, y, 20, 47, "weak");
    var direction = "right";
    var statesMachine = new StateMachine({
      start: "standing",
      states: {
        "running" : {
          action: function() {
            if(direction === "right") {
              physic.velocityX(RUNNING_VEL);
            } else {
              physic.velocityX(-1*RUNNING_VEL);
            }
          },
          transitions: {
            "falling": "falling-moving",
            "stop": "standing",
            "jump": "jumping-moving",
            "moveLeft": "running",
            "moveRight": "running"
          }
        },
        "standing" : {
          action: function() {
            physic.velocityX(0);
          },
          transitions: {
            "falling": "falling-still",
            "moveLeft": "running",
            "moveRight": "running",
            "jump": "jumping-still"
          }
        },
        "jumping-moving" : {
          action: function() {
            physic.noForces();
            var upImpulse = 0.7;
            var frontImpulse = 4;
            if(direction === "right") {
              physic.force(frontImpulse, upImpulse);
            } else {
              physic.force(-1*frontImpulse, upImpulse);
            }
          },
          immediateTransition: "on-the-air-moving"
        },
        "jumping-still" : {
          action: function() {
            physic.noForces();
            var upImpulse = 0.8;
            physic.force(0, upImpulse);
          },
          immediateTransition: "on-the-air-still"
        },
        "on-the-air-still" : {
          action: function() {
            physic.velocityX(0);
          },
          transitions: {
            "falling": "falling-still",
            "fall": "falling-still",
            "moveRight": "on-the-air-moving",
            "moveLeft": "on-the-air-moving",
            "land": "standing"
          }
        },
        "on-the-air-moving" : {
          action: function() {
            if(direction === "right") {
              physic.velocityX(JUMPING_VEL);
            } else {
              physic.velocityX(-1*JUMPING_VEL);
            }
          },
          transitions: {
            "falling": "falling-moving",
            "fall": "falling-still",
            "stop": "on-the-air-still",
            "land": "running",
            "moveLeft": "on-the-air-moving",
            "moveRight": "on-the-air-moving"
          }
        },
        "falling-still": {
          action: "on-the-air-still",
          transitions: {
            "moveRight": "falling-moving",
            "moveLeft": "falling-moving",
            "land": "standing"
          }
        },
        "falling-moving": {
          action: "on-the-air-moving",
          transitions: {
            "stop": "falling-still",
            "land": "running",
            "moveLeft": "falling-moving",
            "moveRight": "falling-moving"
          }
        }
      },
          
      passiveTransitions: [
        "stop", "land"
      ],
      
      activeTransitions: {
        "moveRight": function() { direction = "right"; },
        "moveLeft": function() { direction = "left"; },
        "land": function() { physic.noForces(); },
        "fall" : function() { physic.force(0, -0.3); }
      }
    });

    this.init = function() {
      physic.listen("blockedBottom", function() {
        statesMachine.applyTransition("land");
      });
      physic.listen("falling", function() {
        statesMachine.applyTransition("falling");
      });

      statesMachine.listen("stateChange", function(newState, transition, previousState) {
        callbacks.emit("stateChange", [newState, direction]);
      });
      callbacks.emit("stateChange", [statesMachine.state(), direction]);
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
