(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var UniversalPhysic = LNXGames.UniversalPhysic;
  var Samus = LNXGdie.Hero;

  namespace.Game = function() {
    var self = this;
    this.universe = new UniversalPhysic();
    this.samus =  new Samus(100, 480);

    this.init = function() {
      self.samus.init();
      self.universe.push(self.samus.physic());
      self.universe.push(new SolidPhysicObject(150, 200, 100, 20, "fixed")); // ground
      self.universe.push(new SolidPhysicObject(200, 350, 100, 20, "fixed")); // ground
      self.universe.push(new SolidPhysicObject(450, 400, 100, 20, "fixed")); // ground
      self.universe.push(new SolidPhysicObject(20, 100, 600, 20, "fixed")); // ground
      return this;
    };

    this.update = function() {
      self.universe.update();
      self.samus.update();
    };
  };
}(LNXGdie = window.LNXGdie || {}));
