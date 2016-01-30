(function(namespace) {
  var DirectShotGraphics = LNXAstAttack.DirectShotGraphics;
  var DirectShot = LNXAstAttack.DirectShot;
  var shots = [];

  namespace.DirectShotController = function(container, universe) {
    this.create = function(x, y) {
      var shot = new DirectShot(x, y, -2, 0);
      var shotGraphics = new DirectShotGraphics(container);

      shot.listen("stateChange", shotGraphics.changeAnimationToCompatibleWithState);

      shot.physic().listen("update", function() {
        shotGraphics.update(this.x, 480-this.y);
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
