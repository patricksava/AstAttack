(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;
  var Config = LNXGames.Config;
  var Timing = LNXCommons.Timing;

  var LIFE_POINTS_PER_SHOT = 20;
  var SECONDS_INVENCIBLE = 1.5

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
            "moveDown": "moving",
            "move": "moving"
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
            "moveDown": "moving",
            "move": "moving"
          }
        },

        "hit" : {
          action: function() {
            Config.play("hit");
            healthPoints = healthPoints - LIFE_POINTS_PER_SHOT; 
            if(healthPoints <= 0){
              statesMachine.applyTransition("die");
            } else {
              statesMachine.applyTransition("recover");
            }
          },
          transitions: {
            "recover" : "moving",
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
        "move": function() { },
        "moveRight": function() { directionX = "right"; isOutOfScreenRight() ? physic.velocityX(X_SPEED) : physic.velocityX(0);},
        "moveLeft": function()  { directionX = "left";  isOutOfScreenLeft() ? physic.velocityX(-1*X_SPEED) : physic.velocityX(0); },
        "moveUp": function()    { directionY = "up";    isOutOfScreenTop() ? physic.velocityY(Y_SPEED) : physic.velocityY(0); },
        "moveDown": function()  { directionY = "down";  isOutOfScreenBottom() ? physic.velocityY(-1*Y_SPEED) : physic.velocityY(0); },
        "stopX": function()     { directionX = "";      physic.velocityX(0); },
        "stopY": function()     { directionY = "";      physic.velocityY(0); },
        "recover": function()   { physic.disable(); invencible = true; Timing.timeout(function(){ invencible = false; physic.enable() }, SECONDS_INVENCIBLE)}
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
          physic.disable();
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

    this.move = function(accelX, accelY) {
      statesMachine.applyTransition("move");

      if(accelX + physic.getVelocityX() > 0)
        directionX = "right";
      else
        directionX = "left";

      if(accelY + physic.getVelocityY() > 0)
        directionY = "up";
      else
        directionY = "down";

      if(accelX > 0 && !isOutOfScreenRight())
        physic.velocityX(0);
      else if(accelX < 0 && !isOutOfScreenLeft())
        physic.velocityX(0);
      else
        physic.velocityX(accelX);

      if(accelY > 0 && !isOutOfScreenTop())
        physic.velocityY(0);
      else if(accelY < 0 && !isOutOfScreenBottom())
        physic.velocityY(0);
      else
        physic.velocityY(accelY);

      console.log("Speed X -> " + physic.getVelocityX());
      console.log("Speed Y -> " + physic.getVelocityY());
    }

    this.physic = function(){ return physic; };
    this.healthPoints = function(){ return healthPoints; };
    this.maxHP = function(){ return maxHP; };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
