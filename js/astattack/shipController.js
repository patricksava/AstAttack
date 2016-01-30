(function(namespace) {
  var DirectShotGraphics = LNXAstAttack.DirectShotGraphics;
  var DirectShot = LNXAstAttack.DirectShot;
  var ships = [];

  namespace.ShipController = function(container, universe) {
    this.create = function(x, y, type) {
      console.log("created ", type, " on ", x, y);
    };

    this.updateAll = function() {
      for(var i = 0; i < ships.length; i++) {
        ships[i].update();
      }
    };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
