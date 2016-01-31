(function(namespace) {
  var SpaceScene = LNXAstAttack.SpaceScene;
  var Controls = LNXGames.Controls;
  var Config = LNXGames.Config;

  namespace.StartScene = function(renderer, goToScene) {
    var self = this;
    var container = null;
    var starting = null;
    var FADEOUT_SECONDS = 1;

    this.start = function() {
      container = new PIXI.Container();
      var back = new PIXI.Sprite(PIXI.loader.resources["./img/welcome_screen_2.jpg"].texture.clone());
      container.addChild(back);
    };

    this.update = function(frameCount) {
      if(Controls.wasReleased("enter")) {
        starting = frameCount;
      }

      renderer.render(container);

      if(starting) {
        var diff = frameCount - starting;
        var fadeOutHasFinished = diff >= 60*FADEOUT_SECONDS;
        if(fadeOutHasFinished) {
          goToScene("space");
        } else {
          container.alpha = 1 - (diff / (60*FADEOUT_SECONDS));
        }
      }
    };

    this.destroy = function() {
      container.destroy();
    };
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
