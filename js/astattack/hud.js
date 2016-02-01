(function(namespace) {
  var Config = LNXGames.Config;

  namespace.Hud = function() {
    var self = this;
    var scorePoints = null;
    var hpLabel = null;

    this.addTo = function(container) {
      scoreBack = new PIXI.Sprite(PIXI.loader.resources["./img/scoreHUD.png"].texture);
      scorePoints = new PIXI.Text("", {font : '26px Charybdis', fill : 0xffffff});
      scoreLabel = new PIXI.Text("Score", {font : '17px Charybdis', fill : 0xff6622});

      scoreBack.anchor.x = 0.5;
      scoreBack.anchor.y = 0.5;
      scorePoints.anchor.x = 0.5;
      scorePoints.anchor.y = 0.5;
      scoreLabel.anchor.x = 0.5;
      scoreLabel.anchor.y = 0.5;

      var x = Config.screenWidth() - scoreBack.width / 2.0 - 20;
      var y = scoreBack.height / 2.0 + 20;
      scoreBack.x = x;
      scoreBack.y = y;
      scorePoints.x = x;
      scorePoints.y = y;
      scoreLabel.x = x-40;
      scoreLabel.y = y-26*2/3;
      container.addChild(scoreBack);
      container.addChild(scorePoints);
      container.addChild(scoreLabel);

      hpLabel = new PIXI.Text({font : '20px Monospaced', fill : 0xffffff, lineHeight: 30});
      hpLabel.anchor.x = 0.0;
      hpLabel.anchor.y = 0.0;
      hpLabel.x = 0.5;
      hpLabel.y = 0.5;
      container.addChild(hpLabel);
    };

    this.updateScore = function(score) {
      scorePoints.text = score;
    };

    this.updateHP = function(health, maxHealth) {
      hpLabel.text = "HP: " + health + "/" + maxHealth;
    };
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
