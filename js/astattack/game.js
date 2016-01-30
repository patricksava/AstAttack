(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var UniversalPhysic = LNXGames.UniversalPhysic;
  var Asteroid = LNXGdie.Asteroid;
  var Spaceship = LNXGdie.Spaceship;

  namespace.Game = function() {
    var self = this;
    this.universe = new UniversalPhysic();
    this.asteroid =  new Asteroid(100, 200);

    this.init = function() {
      self.asteroid.init();
      self.universe.push(self.asteroid.physic());
      self.universe.push(new Spaceship(150, 300).physic()); // spaceship
      self.universe.push(new Spaceship(150, 100).physic()); // spaceship
      //self.universe.push(new SolidPhysicObject(150, 200, 100, 20, "fixed")); // ground
      //self.universe.push(new SolidPhysicObject(200, 350, 100, 20, "fixed")); // ground
      //self.universe.push(new SolidPhysicObject(450, 400, 100, 20, "fixed")); // ground
      //self.universe.push(new SolidPhysicObject(20, 100, 600, 20, "fixed")); // ground
      return this;
    };

    this.update = function() {
      self.universe.update();
      self.asteroid.update();
    };
  };
}(LNXGdie = window.LNXGdie || {}));