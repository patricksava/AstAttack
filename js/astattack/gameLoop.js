(function(namespace) {
  var Game = LNXAstAttack.Game;
  var Config = LNXGames.Config;
  var Timing = LNXCommons.Timing;

  var SCENES = {
    "start": LNXAstAttack.StartScene,
    "space": LNXAstAttack.SpaceScene,
    "ending": LNXAstAttack.EndingScene,
    "losing": LNXAstAttack.LosingScene
  };

  namespace.GameLoop = function() {
    var scene = null;
    var container = null;
    var renderer = null;
    var self = this;
    var frameCount = 0;

    this.start = function() {
      Config.screenSize(800, 600);
      frameCount = 0;

      renderer = PIXI.autoDetectRenderer(Config.screenWidth(), Config.screenHeight(), {
        backgroundColor: 0x004020
      });
      document.body.appendChild(renderer.view);

      self.startScene(LNXAstAttack.StartScene);

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
      self.startScene(SCENES[sceneName]);
    };

    this.update = function() {
      frameCount++;
      requestAnimationFrame(self.update);
      scene && scene.update(frameCount);
    };
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
