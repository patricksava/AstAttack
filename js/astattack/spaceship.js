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
    var statesMachine = new StateMachine({
      start: "standing",
      states: {
        "standing" : {
          action: function() {
            physic.velocityX(0);
            physic.velocityY(0);
          }
        },
        "standingShooting" : {
          action: function() {
            
          }
        }
      },
          
      passiveTransitions: [
        "hit"
      ],
      
      activeTransitions: { }
    });

    this.init = function() {
      physic.listen("hitByAsteroid", function() {
        statesMachine.applyTransition("hit");
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
}(LNXGdie = window.LNXGdie || {}));
