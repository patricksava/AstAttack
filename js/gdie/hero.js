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
      timedTransitions: {
        "zigzag": [{"30s": "moveRight"}, {"30s": "moveLeft"}]
      },
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
          }
        }
      },
          
      passiveTransitions: [
        "stop"
      ],
      
      activeTransitions: {
        "moveRight": function() { direction = "right"; },
        "moveLeft": function() { direction = "left"; }
      }
    });

    this.init = function() {
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
