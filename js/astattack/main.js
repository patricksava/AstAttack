(function(){
  var jsloader = new JSLoader(JS_SOURCES);
  gameLoop = new LNXAstAttack.GameLoop();
  gameLoop.start();
  var lastResProgress = 0;
  jsloader.onProgress = function(progress) {
    gameLoop.progress = (progress + lastResProgress)/2;
  };
  LNXAstAttack.LoadingScene.loader
  .add("./img/loading_screen_mini.jpg")
  .load(function() {
     jsloader.loadAsync();
     PIXI.loader
     .add("./img/welcome_screen_2.jpg")
     .add("./img/youlose_screen.png")
     .add("./img/youwon_screen.png")
     .add("./img/spaceship.pod.1.small.red.png")
     .add("./img/spaceship.pod.1.small.blue.png")
     .add("./img/spaceship.pod.1.small.yellow.png")
     .add("./img/spinner.png")
     .add("./img/spinnerl2.png")
     .add("./img/red_ball.png")
     .add("./img/cyan_ball.png")
     .add("./img/cyan_radial.png")
     .add("./img/asteroid_sprite.png")
     .add("./img/asteroid_invencible.png")
     .add("./img/asteroid_death.png")
     .add("./img/space.jpg")
     .add("./img/space_galaxy.png")
     .add("./img/space_stars.jpg")
     .add("./img/earth-light.png")
     .add("./img/earth-fading.png")
     .add("./img/earth-sucked.png")
     .add("./img/explosion/boom3.png")
     .add("./img/explosion/explosion_01_strip13_small.png")
     .add("./img/explosion/explosion_01_strip13_medium.png")
     .add("./img/lifesHUDBack.png")
     .add("./img/lifesHUDFront.png")
     .add("./img/scoreHUD.png")
     .add("./img/lifesHUD.png")
     .on("progress", function(progress) {
       lastResProgress = progress.progress;
       gameLoop.progress = (progress.progress + jsloader.progress())/2;
     })
     .load();
  });

  function JSLoader(sources) {
    var self = this;
    var count = 0;
    var nextScript = 0;

    this.progress = function() {
      return count === 0 ? 0 : (count/sources.length)*100;
    }

    this.loadAsync = function() {
      loadNextScript();
    }
    function loadNextScript() {
      if(nextScript < sources.length) {
        addScript(sources[nextScript], function() {
          loadNextScript();
        });
        nextScript++;
      }
    }

    function addScript(src, cb) {
      var script = document.createElement("script");
      script.onload = function() {
        count++;
        self.onProgress && self.onProgress(self.progress());
        cb();
      };
      script.src = src;
      document.body.appendChild(script);
    }
  }
}());
