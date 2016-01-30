(function(namespace) {
  var SolidPhysicObject = LNXGames.SolidPhysicObject;
  var UniversalPhysic = LNXGames.UniversalPhysic;
  var Asteroid = LNXAstAttack.Asteroid;
  var Spaceship = LNXAstAttack.Spaceship;
  var Config = LNXGames.Config;

  namespace.Game = function() {
    var self = this;
    
    this.score = 0;
    this.universe = new UniversalPhysic();
    this.asteroid = new Asteroid(100, 200);

    this.init = function() {
      Config.screenSize(800, 600);
      self.asteroid.init();
      self.universe.push(self.asteroid.physic());
      return this;
    };

    this.update = function() {
      self.universe.update();
      self.asteroid.update();
    };
  };

  


}(LNXAstAttack = window.LNXAstAttack || {}));
