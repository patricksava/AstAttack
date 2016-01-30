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
      var back = new PIXI.Graphics();
      back.beginFill(0x101010);
      back.drawRect(0, 0, Config.screenWidth(), Config.screenHeight());
      back.endFill();


      var text = new PIXI.Text("Press enter to start.", {font : '24px Monospaced', fill : 0xffffff});
      text.anchor.x = 0.5;
      text.anchor.y = 0.5;
      text.x = Config.screenWidth() / 2.0;
      text.y = Config.screenHeight() / 2.0;
      container.addChild(back);
      container.addChild(text);
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
