(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.SpaceshipL2 = function(x, y, shotCont) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var shotController = shotCont;
    var X_SPEED = -3;
    var Y_SPEED = 0;
    var SHOT_SPEED = 6;
    var tick = 0;
    var physic = new SolidPhysicObject(x, y, 40, 45, "ship");
    var statesMachine = new StateMachine({
      start: "moving",

      timedTransitions: {
        "shoot": [{"1s": "shootProjectile"}]
      },

      states: {
        "moving" : {
          action: function() {
            physic.velocityX(X_SPEED);
            physic.velocityY((1 - 2*(Math.floor(tick / 45)))*2);
            tick = (tick + 1) % 90
          },
          transitions: {
            "shootProjectile" : "moving",
            "exploding" : "exploding"
          }
        },
        
        "exploding" : {
          action: function() {
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
          var vec1 = angleToVector(165);
          var vec2 = angleToVector(195);
          shotController.create(physic.x-1, physic.y, vec1.x*SHOT_SPEED, vec1.y*SHOT_SPEED);
          shotController.create(physic.x-1, physic.y, vec1.x*SHOT_SPEED, vec2.y*SHOT_SPEED);
        }
      }
    });

    function angleToVector(degrees) {
      return {
        x: Math.cos(degrees*Math.PI/180.0),
        y: Math.sin(degrees*Math.PI/180.0)
      };
    }

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
