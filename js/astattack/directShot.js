(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;
  var Timing = LNXCommons.Timing;

  namespace.DirectShot = function(x, y, vx, vy, type) {
    var self = this;
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var physic = null;
    if(type == "linear")
      physic = new SolidPhysicObject(x, y, 13, 10, "shot");
    else
      physic = new SolidPhysicObject(x, y, 10, 10, "shot");

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
            physic.disable();
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

      physic.listen("collision", function(obj) {
        if(obj.type === "asteroid") {
          statesMachine.applyTransition("implode");
        }
      });
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
