(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.Spaceship = function(x, y, shotCont) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var shotController = shotCont;
    var X_SPEED = -0.3;
    var Y_SPEED = 0;
    var physic = new SolidPhysicObject(x, y, 45, 45, "weak");
    var statesMachine = new StateMachine({
      start: "standing",

      timedTransitions: {
        "shoot": [{"4s": "shootProjectile"}]
      },

      states: {
        "standing" : {
          action: function() {
            physic.velocityX(X_SPEED);
            physic.velocityY(0);
          }
        },
        
        "exploding" : {
          action: function() {
            
          }
        }
      },
          
      passiveTransitions: [ ],
      
      activeTransitions: { 
        "shootProjectile" : function(){
          shotController.create(physic.x-1, physic.y);
        }
      }
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
}(LNXAstAttack = window.LNXAstAttack || {}));
