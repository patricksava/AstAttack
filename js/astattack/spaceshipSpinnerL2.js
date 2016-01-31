(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.SpaceshipSpinnerL2 = function(x, y, shotCont) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var shotController = shotCont;
    var X_SPEED = -3;
    var Y_SPEED = 0;
    var SHOT_SPEED = 6;
    var angle = 180;
    var physic = new SolidPhysicObject(x, y, 70, 70, "ship-25");
    var statesMachine = new StateMachine({
      start: "moving",

      timedTransitions: {
        "shoot": [{"1s": "shootProjectile"}]
      },

      states: {
        "moving" : {
          action: function() {
            physic.velocityX(X_SPEED);
            physic.velocityY(0);
          },
          transitions: {
            "shootProjectile" : "moving",
            "exploding" : "exploding"
          }
        },
        
        "exploding" : {
          action: function() {
            if(physic.vel.x != 0)
              new Audio("./audio/explode.wav").play();
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
          var centerX = physic.x+physic.width/2.0
          var centerY = physic.y-physic.height/2.0;
          for(var i = 0; i < 5; i++) {
            var shotAngle = angle + i*20;
            var rotVec = angleToVector(shotAngle);
            var shotVec = angleToVector((shotAngle+120)%360);
            shotController.create(centerX+rotVec.x*20, centerY+rotVec.y*20, shotVec.x*SHOT_SPEED, shotVec.y*SHOT_SPEED, "circular");
          }
          angle = (angle + 75) % 360;
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
