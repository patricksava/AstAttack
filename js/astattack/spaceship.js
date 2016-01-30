(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.Spaceship = function(x, y) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var X_SPEED = -3;
    var Y_SPEED = 0;
    var physic = new SolidPhysicObject(x, y, 45, 45, "weak");
    var statesMachine = new StateMachine({
      start: "standing",
      states: {
        "standing" : {
          action: function() {
            physic.velocityX(X_SPEED);
            physic.velocityY(0);
          }
        },
        "standingShooting" : {
          action: function() {
            
          }
        },
        "exploding" : {
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
        statesMachine.applyTransition("exploding");
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
