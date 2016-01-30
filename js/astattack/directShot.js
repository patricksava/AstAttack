(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.DirectShot = function(x, y, vx, vy) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var physic = new SolidPhysicObject(x, y, 20, 20, "shot");
    var statesMachine = new StateMachine({
      start: "flying",
      states: {
        "flying" : {
          action: function() {
            physic.velocityX(vx);
            physic.velocityY(vy);
          },
          transitions: {
            "implode": "implode"
          }
        },
        "implode" : {
          action: function() {
            physic.velocityX(0);
            physic.velocityY(0);
          }
        }
      },
          
      passiveTransitions: [
        "implode"
      ]
    });

    this.init = function() {
      statesMachine.listen("stateChange", function(newState) {
        callbacks.emit("stateChange", [newState]);
      });
      callbacks.emit("stateChange", [statesMachine.state()]);
    }

    this.act = function(action) {
      statesMachine.applyTransition(action);
    };

    this.update = function() {
      statesMachine.executeCurrentState();
    };

    this.physic = function(){ return physic; };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
