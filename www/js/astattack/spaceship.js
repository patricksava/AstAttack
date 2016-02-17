(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;
  var Config = LNXGames.Config;

  namespace.Spaceship = function(x, y, shotCont) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var shotController = shotCont;
    var X_SPEED = -3;
    var Y_SPEED = 0;
    var SHOT_SPEED = 6;
    var physic = new SolidPhysicObject(x, y, 40, 45, "ship-10");
    var tick = 0;
    var statesMachine = new StateMachine({
      start: "moving",

      timedTransitions: {
        "shoot": [{"1s": "shootProjectile"}]
      },

      states: {
        "moving" : {
          action: function() {
            physic.velocityX(X_SPEED);
            physic.velocityY(2*Math.sin((tick++*0.05)));
          },
          transitions: {
            "shootProjectile" : "moving",
            "exploding" : "exploding"
          }
        },
        
        "exploding" : {
          action: function() {
            if(physic.vel.x != 0)
                Config.play("explode");

            physic.velocityX(0);
            physic.velocityY(0);
          },
          transitions: {
            "end": "dead"
          }
        },

        "dead" : {
          action: function() {
            callbacks.emit("dead");
          },
          transitions: { }
        }
      },
          
      passiveTransitions: [ ],
      
      activeTransitions: { 
        "shootProjectile" : function(){
           shotController.create(physic.x-1, physic.y, -SHOT_SPEED, 0, "linear");
        }
      }
    });

    this.init = function() {
      physic.listen("collision", function(obj) {
        if(obj.type === "asteroid")
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
