(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.UniversalPhysic = function() {
    var callbacks = Callbacks.initializeFor(this);
    var objects = [];

    this.push = function(obj) {
      objects.push(obj);
      callbacks.emit("objectPushed", obj);
    };

    this.destroy = function(obj) {
      for(var i = 0; i < objects.length; i++) {
        if(obj.id === objects[i].id) {
          objects.splice(i, 1);
          break;
        }
      }
    };

    this.update = function() {
      for(var i = 0; i < objects.length; i++) {
        objects[i].update();
      }

      for(var i = 0; i < objects.length-1; i++) {
        for(var j = i+1; j < objects.length; j++) {
          var obj1 = objects[i];
          var obj2 = objects[j];
          if(obj1.collides(obj2)) treatCollision(obj1, obj2);
        }
      }

      for(var i = 0; i < objects.length; i++) {
        objects[i].emitUpdated();
      }
    };

    function treatCollision(obj1, obj2) {
      obj1.emitCollision(obj2);
      obj2.emitCollision(obj1);
    }
  };
}(LNXGames = window.LNXGames || {}));
