(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.Spaceship = function(x, y) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var RUNNING_VEL = 0;
    var JUMPING_VEL = 0;
    var physic = new SolidPhysicObject(x, y, 40, 47, "weak");
    var direction = "left";
    var statesMachine = new StateMachine({
      start: "standing",
      states: {
        "standing" : {
          action: function() {
            physic.velocityX(0);
          }
        },
        "standingShooting" : {
          action: function() {
            console.log("Shooting");
          }
        }
      },
          
      passiveTransitions: [
        "hit"
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
      physic.listen("hitByAsteroid", function() {
        statesMachine.applyTransition("hit");
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
