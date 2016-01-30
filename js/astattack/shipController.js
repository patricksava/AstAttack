(function(namespace) {
  var SpaceshipGraphics = LNXAstAttack.SpaceshipGraphics;
  var Spaceship = LNXAstAttack.Spaceship;
  var Game = LNXAstAttack.Game;
  var ships = [];

  namespace.ShipController = function(container, universe, shotController) {
    this.create = function(x, y, type) {
      console.log("created ", type, " on ", x, y);
      var ship = new Spaceship(x, y, shotController, type);
      var shipGraphics = new SpaceshipGraphics(container);

      ship.listen("stateChange", shipGraphics.changeAnimationToCompatibleWithState);

      ship.physic().listen("update", function() {
        shipGraphics.update(this.x, 600 - this.y);
      });
      universe.push(ship.physic());
      ship.init();
      ships.push(ship);
    };

    this.updateAll = function() {
      for(var i = 0; i < ships.length; i++) {
        ships[i].update();
      }
    };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
