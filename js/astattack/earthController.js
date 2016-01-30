(function(namespace) {
  var Config = LNXGames.Config;
  var Earth = LNXAstAttack.Earth;
  var EarthGraphics = LNXAstAttack.EarthGraphics;
  var Config = LNXGames.Config;

  namespace.EarthController = function(container, universe) {
    var self = this;

    var earth = null;

    this.create = function(whenEnded) {
      earth = new Earth(Config.screenWidth());
      var graphics = new EarthGraphics(container);

      earth.listen("stateChange", graphics.changeAnimationToCompatibleWithState);

      earth.physic().listen("update", function() {
        graphics.update(this.x-200, Config.screenHeight() - this.y);
      });
      graphics.listen("explodeAnimationEnd", function() {
        whenEnded();
      });
      universe.push(earth.physic());
      earth.init();
    };

    this.hit = function() {
      earth.act("hit");
    };

    this.update = function() {
      earth && earth.update();
    };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
