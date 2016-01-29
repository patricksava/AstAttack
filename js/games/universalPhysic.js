(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.UniversalPhysic = function() {
    var callbacks = Callbacks.initializeFor(this);
    var objects = [];

    this.push = function(obj) {
      objects.push(obj);
      obj.emitOnUniverse();
      callbacks.emit("objectPushed", obj);
    };

    this.update = function() {
      for(var i = 0; i < objects.length; i++) {
        objects[i].update();
        applyTo(objects[i]);
      }

      for(var i = 0; i < objects.length-1; i++) {
        for(var j = i+1; j < objects.length; j++) {
          var obj1 = objects[i];
          var obj2 = objects[j];
          treatCollision(obj1.collides(obj2));
        }
      }

      for(var i = 0; i < objects.length; i++) {
        objects[i].verifyFalling();
        objects[i].emitUpdated();
        callbacks.emit("objectUpdated", objects[i]);
      }
    };

    function treatCollision(collision) {
      if (!collision) return;
      var weak = collision.solidWeakObject;
      var fixed = collision.solidFixedObject;
      
      var topOut = weak.y - fixed.y;
      var bottomOut = (fixed.y-fixed.height) - (weak.y-weak.height);
      var leftOut = fixed.x - weak.x;
      var rightOut = (weak.x+weak.width) - (fixed.x+fixed.width);

      if(topOut >= Math.max(bottomOut, leftOut, rightOut)) {
        weak.y = fixed.y + weak.height;
        weak.stopMovementToDownwards();
        weak.emitBlockedBottom(fixed);
      } else if(leftOut >= Math.max(topOut, bottomOut, rightOut)) {
        weak.x = fixed.x - weak.width;
        weak.stopMovementToRight();
        weak.emitBlockedRight(fixed);
      } else if(rightOut >= Math.max(topOut, bottomOut, leftOut)) {
        weak.stopMovementToLeft();
        weak.x = fixed.x + fixed.width;
        weak.emitBlockedLeft(fixed);
      } else if(bottomOut >= Math.max(topOut, leftOut, rightOut)) {
        weak.stopMovementToUpwards();
        weak.y = fixed.y - fixed.height;
        weak.emitBlockedTop(fixed);
      }
    }

    function applyTo(obj) {
      if(obj.type !== "fixed") {
        var gravity = -0.05;
        var horizontalResistence = 0.03;
        if(obj.vel.y > -10) {
          obj.force(0, gravity);
        } else {
          obj.forceToZero(0, 10);
        }
        obj.forceToZero(0.03, 0);
      }
    };
  };
}(LNXGames = window.LNXGames || {}));
