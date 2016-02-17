(function(namespace) {
  var Game = LNXAstAttack.Game;
  var Config = LNXGames.Config;
  var Timing = LNXCommons.Timing;

  namespace.GameLoop = function() {
    var scene = null;
    var container = null;
    var renderer = null;
    var self = this;
    var frameCount = 0;
    this.progress = 0;

    this.start = function() {
      Config.screenSize(window.innerWidth, window.innerHeight);
      frameCount = 0;

      renderer = PIXI.autoDetectRenderer(Config.screenWidth(), Config.screenHeight(), {
        backgroundColor: 0x000000
      });
      document.body.appendChild(renderer.view);

      self.startScene(LNXAstAttack.LoadingScene);

      requestAnimationFrame(self.update);
    };

    this.destroyScene = function() {
      Timing.reset();
      scene.destroy();
      scene = null;
    };

    this.startScene = function(SceneConstructor) {
      frameCount = 0;
      scene = new SceneConstructor(renderer, self.changeScene);
      scene.start();
    };

    this.changeScene = function(sceneName) {
      self.destroyScene();
      self.startScene(getScene(sceneName));
    };

    this.update = function() {
      frameCount++;
      requestAnimationFrame(self.update);
      scene && scene.update(frameCount, self.progress);
    };

    function getScene(name) {
      var scenes = {
        "start": LNXAstAttack.StartScene,
        "space": LNXAstAttack.SpaceScene,
        "ending": LNXAstAttack.EndingScene,
        "losing": LNXAstAttack.LosingScene
      };
      return scenes[name];
    }
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
