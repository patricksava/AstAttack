(function(namespace) {
  var Controls = LNXGames.Controls;
  var Config = LNXGames.Config;

  namespace.LosingScene = function(renderer, goToScene) {
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


      var text = new PIXI.Text("The poor asteroid could not destroy earth. :(\n\nPress enter to restart.", {font : '34px Monospaced', fill : 0xffffff, align: "center", lineHeight: 60});
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
