(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;

  var nextId = 1;
  namespace.SolidPhysicObject = function(x, y, width, height, type) {
    var callbacks = Callbacks.initializeFor(this);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.vel = {x: 0, y: 0};
    this.accel = {x: 0, y: 0};
    this.id = nextId++;
    this.disabled = false;

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

    this.emitCollision = function(objColliding) {
      callbacks.emit("collision", objColliding);
    };

    this.disable = function() {
      this.disabled = true;
    };

    this.collides = function(obj2) {
      if(this.disabled || obj2.disabled) return false;
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
