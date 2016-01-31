(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;
  var Config = LNXGames.Config;
  var Timing = LNXCommons.Timing;

  var LIFE_POINTS_PER_SHOT = 20;

  namespace.Asteroid = function(x, y) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var maxHP = 100;
    var healthPoints = 100;
    var X_SPEED = 5;
    var Y_SPEED = 5;
    var physic = new SolidPhysicObject(x, y, 40, 40, "asteroid");
    var directionX = "";
    var directionY = "";
    var invencible = false;

    var statesMachine = new StateMachine({
      start: "standing",
      states: {
        "moving" : {
          action: function() {
            
          },
          transitions: {
            "destroyed": "destroyed",
            "hitByProjectile" : "hit",
            "stop": "standing",
            "stopX": "moving",
            "stopY": "moving",
            "moveLeft": "moving",
            "moveRight": "moving",
            "moveUp": "moving",
            "moveDown": "moving"
          }
        },
        "standing" : {
          action: function() {
            physic.velocityX(0);
            physic.velocityY(0);

            directionY = "";
            directionX = "";
          },
          transitions: {
            "destroyed": "destroyed",
            "hitByProjectile" : "hit",
            "moveLeft": "moving",
            "moveRight": "moving",
            "moveUp": "moving",
            "moveDown": "moving"
          }
        },

        "hit" : {
          action: function() {
            healthPoints = healthPoints - LIFE_POINTS_PER_SHOT; 
            if(healthPoints <= 0){
              statesMachine.applyTransition("die");
            } else {
              statesMachine.applyTransition("recover");
            }
          },
          transitions: {
            "recover" : "standing",
            "die" : "dead"
          }
        },

        "dead" : {
          action: function() {
            physic.disable();
            callbacks.emit("dead");
            physic.velocityX(0);
            physic.velocityY(0);
          }
        }
        
      },
          
      passiveTransitions: [
        "stop"
      ],
      
      activeTransitions: {
        "moveRight": function() { directionX = "right"; isOutOfScreenRight() ? physic.velocityX(X_SPEED) : physic.velocityX(0);},
        "moveLeft": function()  { directionX = "left";  isOutOfScreenLeft() ? physic.velocityX(-1*X_SPEED) : physic.velocityX(0); },
        "moveUp": function()    { directionY = "up";    isOutOfScreenTop() ? physic.velocityY(Y_SPEED) : physic.velocityY(0); },
        "moveDown": function()  { directionY = "down";  isOutOfScreenBottom() ? physic.velocityY(-1*Y_SPEED) : physic.velocityY(0); },
        "stopX": function()     { directionX = "";      physic.velocityX(0); },
        "stopY": function()     { directionY = "";      physic.velocityY(0); },
        "recover": function()   { physic.disable(); invencible = true; Timing.timeout(function(){ invencible = false; physic.enable() }, 3)}
      }
    });

    function isOutOfScreenRight() {
      return physic.x < Config.screenWidth() - 50;
    }

    function isOutOfScreenLeft() {
      return physic.x > 0;
    }

    function isOutOfScreenTop() {
      return physic.y < Config.screenHeight();
    }

    function isOutOfScreenBottom() {
      return physic.y > 50;
    }

    this.init = function() {
      physic.listen("collision", function(obj) {
        var shipMatch = obj.type.match(/^ship-(\d+)/);
        if(shipMatch) {
          callbacks.emit("shipDestroyed", [parseFloat(shipMatch[1])]);
        } else if(obj.type === "shot"){
          statesMachine.applyTransition("hitByProjectile");
        } else if(obj.type === "earth"){
          callbacks.emit("earthHitted");
        }
      });

      statesMachine.listen("stateChange", function(newState, transition, previousState) {
        callbacks.emit("stateChange", [newState, directionX, directionY, invencible]);
      });
      callbacks.emit("stateChange", [statesMachine.state(), directionX, directionY]);
    }

    this.act = function(action) {
      statesMachine.applyTransition(action);
    };

    this.update = function() {
      statesMachine.executeCurrentState();
    };

    this.physic = function(){ return physic; };

    this.healthPoints = function(){ return healthPoints; };
    this.maxHP = function(){ return maxHP; };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
