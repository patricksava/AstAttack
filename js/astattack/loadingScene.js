(function(namespace) {
  var SpaceScene = LNXAstAttack.SpaceScene;
  var Config = LNXGames.Config;

  namespace.LoadingScene = function(renderer, goToScene) {
    var self = this;
    var container = new PIXI.Container();
    var rectangle;
    var started = false;

    this.start = function() {
      var screenRes = namespace.LoadingScene.loader.resources["./img/loading_screen_mini.jpg"];
      if(!screenRes || !screenRes.texture) {
        setTimeout(self.start, 1000);
      } else {
        var back = new PIXI.Sprite(screenRes.texture.clone());
        rectangle = new PIXI.Graphics();
        rectangle.beginFill(0xfea868);
        rectangle.drawRect(0, 0, 412, 31);
        rectangle.x = 197;
        rectangle.y = 335;
        rectangle.width = 0;
        rectangle.endFill();
        container.addChild(back);
        container.addChild(rectangle);
        started = true;
      }
    };

    this.update = function(frameCount, progress) {
      if(started) {
        rectangle.width = progress/100 * 412;
        renderer.render(container);
        if(progress >= 99.8) {
          goToScene("start");
        }
      }
    };

    this.destroy = function() {
      container.destroy();
    };
  };

  namespace.LoadingScene.loader = new PIXI.loaders.Loader();

}(LNXAstAttack = window.LNXAstAttack || {}));
