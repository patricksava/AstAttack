(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var StateMachine = LNXGames.StateMachine;
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.Asteroid = function(x, y) {
    var callbacks = Callbacks.initializeFor(this);
    var myself = this;
    var X_SPEED = 3;
    var Y_SPEED = 3;
    var physic = new SolidPhysicObject(x, y, 45, 45, "weak");
    var directionX = "";
    var directionY = "";
    var statesMachine = new StateMachine({
      start: "standing",
      states: {
        "moving" : {
          action: function() {

          },
          transitions: {
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
            "moveLeft": "moving",
            "moveRight": "moving",
            "moveUp": "moving",
            "moveDown": "moving"
          }
        }
        
      },
          
      passiveTransitions: [
        "stop", "shot"
      ],
      
      activeTransitions: {
        "moveRight": function() { directionX = "right"; physic.velocityX(X_SPEED); },
        "moveLeft": function()  { directionX = "left";  physic.velocityX(-1*X_SPEED); },
        "moveUp": function()    { directionY = "up";    physic.velocityY(Y_SPEED); },
        "moveDown": function()  { directionY = "down";  physic.velocityY(-1*Y_SPEED); },
        "stopX": function()     { directionX = "";      physic.velocityX(0); },
        "stopY": function()     { directionY = "";      physic.velocityY(0); }
      }
    });

    this.init = function() {
      physic.listen("shot", function() {
        statesMachine.applyTransition("shot");
      });

      statesMachine.listen("stateChange", function(newState, transition, previousState) {
        callbacks.emit("stateChange", [newState, directionX, directionY]);
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
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
