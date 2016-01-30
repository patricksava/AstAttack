(function(namespace) {
  var DirectShotGraphics = LNXAstAttack.DirectShotGraphics;
  var DirectShot = LNXAstAttack.DirectShot;
  var shots = [];

  namespace.DirectShotController = function(container, universe) {

    var shotTypes = {
      STRAIGHT : {x : -2, y : 0},
      DIAGONAL_UP : {x : -2, y : 2},
      DIAGONAL_DOWN : {x : -2, y : -2},
    };

    this.shotType = function(shotName) {
      if(shotName == "straight")
        return shotTypes.STRAIGHT;
      else if(shotName == "diagonal_up")
        return shotTypes.DIAGONAL_UP;
      else if(shotName == "diagonal_down")
        return shotTypes.DIAGONAL_DOWN;
    }

    this.create = function(x, y, type) {
      var shot = new DirectShot(x, y, type.x, type.y);
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
