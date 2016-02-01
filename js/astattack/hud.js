(function(namespace) {
  var Config = LNXGames.Config;

  namespace.Hud = function() {
    var self = this;
    var scoreLabel = null;
    var hpLabel = null;

    this.addTo = function(container) {
      scoreLabel = new PIXI.Text({font : '20px Monospaced', fill : 0xffffff, lineHeight: 30});
      scoreLabel.anchor.x = 1.0;
      scoreLabel.anchor.y = 0.0;
      scoreLabel.x = Config.screenWidth();
      scoreLabel.y = 0;
      container.addChild(scoreLabel);

      hpLabel = new PIXI.Text({font : '20px Monospaced', fill : 0xffffff, lineHeight: 30});
      hpLabel.anchor.x = 0.0;
      hpLabel.anchor.y = 0.0;
      hpLabel.x = 0.5;
      hpLabel.y = 0.5;
      container.addChild(hpLabel);
    };

    this.updateScore = function(score) {
      scoreLabel.text = "Score: " + score + " ";
    };

    this.updateHP = function(health, maxHealth) {
      hpLabel.text = "HP: " + health + "/" + maxHealth;
    };
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
