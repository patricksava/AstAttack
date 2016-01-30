(function(namespace) {
  var SpaceshipGraphics = LNXAstAttack.SpaceshipGraphics;
  var Spaceship = LNXAstAttack.Spaceship;
  var Config = LNXGames.Config;
  var ships = [];

  namespace.ShipController = function(container, universe, shotController) {
    var self = this;
    var allGraphics = {};
    var ships = {};
    var lastShipId = 0;

    this.create = function(x, y, type) {
      var id = lastShipId++;
      console.log("created ", type, " on ", x, y);
      var ship = new Spaceship(x, y, shotController, type);
      var shipGraphics = new SpaceshipGraphics(container);

      ship.listen("stateChange", shipGraphics.changeAnimationToCompatibleWithState);
      ship.listen("dead", function() {
        self.destroy(id);
      });

      ship.physic().listen("update", function() {
        shipGraphics.update(this.x, Config.screenHeight() - this.y);
      });
      shipGraphics.listen("explodingEnd", function() {
        ship.act("end");
      });
      universe.push(ship.physic());
      ship.init();
      allGraphics[id] = shipGraphics;
      ships[id] = ship;
    };

    this.updateAll = function() {
      for(id in ships) {
        ships[id].update();
      }
    };

    this.destroy = function(id) {
      universe.destroy(ships[id].physic());
      allGraphics[id].destroy();
      delete ships[id];
      delete allGraphics[id];
    };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
