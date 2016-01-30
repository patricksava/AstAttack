(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.Spaceship = function(x, y, shotCont, projectile) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var shotController = shotCont;
    var X_SPEED = -0.3;
    var Y_SPEED = 0;
    var projectileType = projectile;
    var physic = new SolidPhysicObject(x, y, 45, 45, "weak");
    var statesMachine = new StateMachine({
      start: "moving",

      timedTransitions: {
        "shoot": [{"4s": "shootProjectile"}]
      },

      states: {
        "moving" : {
          action: function() {
            physic.velocityX(X_SPEED);
            physic.velocityY(0);
          },
          transitions: {
            "shootProjectile" : "moving"
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
          shotController.create(physic.x-1, physic.y, shotController.shotType(projectileType));
        }
      }
    });

    this.init = function() {
      physic.listen("collision", function(obj) {
        statesMachine.applyTransition("exploding");
      });

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
