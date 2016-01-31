(function(namespace) {
  var DirectShotGraphics = LNXAstAttack.DirectShotGraphics;
  var DirectShot = LNXAstAttack.DirectShot;
  var Game = LNXAstAttack.Game;
  var Config = LNXGames.Config;

  namespace.DirectShotController = function(container, universe) {
    var self = this;
    var shots = {};
    var allGraphics = {};
    var lastShotId = 0;

    this.create = function(x, y, vx, vy, type) {
      var id = lastShotId++;
      var shot = new DirectShot(x, y, vx, vy, type);
      var shotGraphics = new DirectShotGraphics(container, type);

      shot.listen("stateChange", shotGraphics.changeAnimationToCompatibleWithState);

      shot.physic().listen("update", function() {
        shotGraphics.update(this.x, Config.screenHeight()-this.y);
      });


      shot.physic().listen("outOfScreen", function() {
        self.destroy(id);
      });

      shotGraphics.listen("implodeAnimationEnd", function() {
        self.destroy(id);
      });

      if(x > 0)
        new Audio("./audio/Longshot.mp3").play();


      universe.push(shot.physic());
      shot.init();
      shots[id] = shot;
      allGraphics[id] = shotGraphics;
    };

    this.updateAll = function() {
      for(var id in shots) {
        shots[id].update();
      }
    };

    this.destroy = function(id) {
      universe.destroy(shots[id].physic());
      delete shots[id];
      allGraphics[id].destroy();
      delete allGraphics[id];
    };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
