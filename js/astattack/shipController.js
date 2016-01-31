(function(namespace) {
  var SpaceshipGraphics = LNXAstAttack.SpaceshipGraphics;
  var Spaceship = LNXAstAttack.Spaceship;
  var SpaceshipL2 = LNXAstAttack.SpaceshipL2;
  var SpaceshipSpinner = LNXAstAttack.SpaceshipSpinner;
  var SpaceshipSpinnerL2 = LNXAstAttack.SpaceshipSpinnerL2;
  var Config = LNXGames.Config;
  var ships = [];

  var TYPES = {
    "straight": {model: Spaceship, graphics: SpaceshipGraphics},
    "double": {model: SpaceshipL2, graphics: SpaceshipGraphics},
    "spinner": {model: SpaceshipSpinner, graphics: SpaceshipGraphics},
    "spinnerl2": {model: SpaceshipSpinnerL2, graphics: SpaceshipGraphics}
  };

  namespace.ShipController = function(container, universe, shotController) {
    var self = this;
    var allGraphics = {};
    var ships = {};
    var lastShipId = 0;

    this.create = function(x, y, type) {
      var typeConstructors = TYPES[type];
      var Ship = typeConstructors.model;
      var ShipGraphics = typeConstructors.graphics;
      var id = lastShipId++;
      var ship = new Ship(x, y, shotController);
      var shipGraphics = new ShipGraphics(container, type);

      ship.listen("stateChange", shipGraphics.changeAnimationToCompatibleWithState);
      ship.listen("dead", function() {
        self.destroy(id);
      });

      ship.physic().listen("collision", function(obj) {
        if(obj.type === "asteroid") {
          ship.physic().disable();
        }
      });

      ship.physic().listen("outOfScreen", function() {
        self.destroy(id);
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
        //console.log("shipController: updateAll");
        ships[id].update();
        var physic = ships[id].physic();
        allGraphics[id].update(physic.x, Config.screenHeight() - physic.y);
      }
    };

    this.destroy = function(id) {
      universe.destroy(ships[id].physic());
      delete ships[id];
      allGraphics[id].destroy();
      delete allGraphics[id];
    };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
