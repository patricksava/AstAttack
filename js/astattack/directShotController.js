(function(namespace) {
  var DirectShotGraphics = LNXAstAttack.DirectShotGraphics;
  var DirectShot = LNXAstAttack.DirectShot;
  var Game = LNXAstAttack.Game;
  var Config = LNXGames.Config;
  var shots = [];

  namespace.DirectShotController = function(container, universe) {
    this.create = function(x, y, vx, vy) {
      var shot = new DirectShot(x, y, vx, vy);
      var shotGraphics = new DirectShotGraphics(container);

      shot.listen("stateChange", shotGraphics.changeAnimationToCompatibleWithState);

      shot.physic().listen("collision", function(obj) {
        if(obj.type === "asteroid") {
          shot.physic().disable();
        }
      });

      shot.physic().listen("update", function() {
        shotGraphics.update(this.x, Config.screenHeight()-this.y);
      });
      universe.push(shot.physic());
      shot.init();
      shots.push(shot);
    };

    this.updateAll = function() {
      for(var i = 0; i < shots.length; i++) {
        shots[i].update();
      }
    };
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
