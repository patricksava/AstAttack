(function(namespace) {
  var Config = LNXGames.Config;

  namespace.Hud = function() {
    var self = this;
    var scorePoints = null;
    var hpLabel = null;

    this.addTo = function(container) {
      scoreBack = new PIXI.Sprite(PIXI.loader.resources["./img/scoreHUD.png"].texture);
      scorePoints = new PIXI.Text("", {font : '26px Charybdis', fill : 0xffffff});
      scoreLabel = new PIXI.Text("Score", {font : '17px Charybdis', fill : 0xcc4411});

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

      healthBack = new PIXI.Sprite(PIXI.loader.resources["./img/lifesHUD.png"].texture);
      healthPtsBack = new PIXI.Sprite(PIXI.loader.resources["./img/lifesHUDBack.png"].texture);
      healthPtsFront = new PIXI.Sprite(PIXI.loader.resources["./img/lifesHUDFront.png"].texture);
      healthLabel = new PIXI.Text("Lifes", {font : '17px Charybdis', fill : 0xcc4411});

      healthBack.x = 20;
      healthBack.y = 20;
      healthPtsBack.x = 20;
      healthPtsBack.y = 20;
      healthPtsFront.x = 20;
      healthPtsFront.y = 20;
      healthLabel.x = 40;
      healthLabel.y = 15;

      container.addChild(healthBack);
      container.addChild(healthPtsBack);
      container.addChild(healthPtsFront);
      container.addChild(healthLabel);
    };

    this.updateScore = function(score) {
      scorePoints.text = score;
    };

    this.updateHP = function(health, maxHealth) {
      var lifes = health / 20;
      var maxLifes = maxHealth / 20;
      healthPtsFront.texture.frame = new PIXI.Rectangle(0, 0, 35+lifes*(healthPtsBack.width-70)/maxLifes, healthPtsBack.height);
    };
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
