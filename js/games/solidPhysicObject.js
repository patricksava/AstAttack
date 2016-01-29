(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.SolidPhysicObject = function(x, y, width, height, type) {
    var callbacks = Callbacks.initializeFor(this);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.vel = {x: 0, y: 0};
    this.accel = {x: 0, y: 0};

    this.velocityX = function(newX) {
      this.vel.x = newX;
    };

    this.velocityY = function(newY) {
      this.vel.y = newY;
    };

    this.noForcesX = function() {
      this.accel.x = 0;
    };

    this.noForces = function() {
      this.accel.x = 0;
      this.accel.y = 0;
      this.vel.x = 0;
      this.vel.y = 0;
    };

    this.force = function(x, y) {
      this.accel.x += x;
      this.accel.y += y;
    };

    this.forceToZero = function(x, y) {
      var absX = Math.abs(this.accel.x) - x;
      var absY = Math.abs(this.accel.y) - y;
      absX = Math.max(0, absX);
      absY = Math.max(0, absY);
      this.accel.x = (this.accel.x<0 ? -1*absX : absX);
      this.accel.y = (this.accel.y<0 ? -1*absY : absY);
    };

    this.update = function() {
      this.vel.x += this.accel.x;
      this.vel.y += this.accel.y;
      this.x += this.vel.x;
      this.y += this.vel.y;
    };

    this.emitUpdated = function() {
      callbacks.emit("update");
    };

    this.emitOnUniverse = function() {
      callbacks.emit("onUniverse");
    };

    this.stopMovementToDownwards = function() {
      if(this.accel.y < 0) this.accel.y = 0;
      if(this.vel.y < 0) this.vel.y = 0;
    };

    this.stopMovementToUpwards = function() {
      if(this.accel.y > 0) this.accel.y = 0;
      if(this.vel.y > 0) this.vel.y = 0;
    };

    this.stopMovementToLeft = function() {
      if(this.accel.x < 0) this.accel.x = 0;
      if(this.vel.x < 0) this.vel.x = 0;
    };

    this.stopMovementToRight = function() {
      if(this.accel.x > 0) this.accel.x = 0;
      if(this.vel.x > 0) this.vel.x = 0;
    };

    this.emitBlockedBottom = function(objBlocking) {
      callbacks.emit("blockedBottom", objBlocking);
    };

    this.emitBlockedTop = function(objBlocking) {
      callbacks.emit("blockedTop", objBlocking);
    };

    this.emitBlockedRight = function(objBlocking) {
      callbacks.emit("blockedRight", objBlocking);
    };

    this.emitBlockedLeft = function(objBlocking) {
      callbacks.emit("blockedLeft", objBlocking);
    };

    this.verifyFalling = function() {
      if(this.vel.y < 0) callbacks.emit("falling");
    }

    this.collides = function(obj2) {
      var topLeftCorner1 =     {x: this.x,            y: this.y};
      var topLeftCorner2 =     {x: obj2.x,            y: obj2.y};
      var bottomRightCorner1 = {x: this.x+this.width, y: this.y-this.height};
      var bottomRightCorner2 = {x: obj2.x+obj2.width, y: obj2.y-obj2.height};

      var noCollision = 
        (topLeftCorner1.x > bottomRightCorner2.x || bottomRightCorner1.x < topLeftCorner2.x) ||
        (topLeftCorner1.y < bottomRightCorner2.y || bottomRightCorner1.y > topLeftCorner2.y);

      if(noCollision) {
        return null;
      } else {
        var weak = this;
        var fixed = this;
        if(this.type === "fixed") {
          weak = obj2;
        } else {
          fixed = obj2;
        }

        return {solidWeakObject: weak, solidFixedObject: fixed}
      }
    };
  };
}(LNXGames = window.LNXGames || {}));
