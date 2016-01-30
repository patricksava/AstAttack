(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;
  var Config = LNXGames.Config;

  namespace.Earth = function(x) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var physic = new SolidPhysicObject(x, Config.screenHeight(), Config.screenWidth(), Config.screenHeight(), "earth");
    var statesMachine = new StateMachine({
      start: "alive",
      states: {
        "alive" : {
          action: function() {
            physic.velocityX(-1);
            physic.velocityY(0);
          },
          transitions: {
            "hit": "explode"
          }
        },
        "explode" : {
          action: function() {
            physic.velocityX(0);
            physic.velocityY(0);
          },
          transitions: {}
        }
      },
          
      passiveTransitions: [
        "hit"
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
