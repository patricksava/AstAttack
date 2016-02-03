(function(namespace) {
  namespace.Background = function() {
    var bg1 = null;
    var bg2 = null;

    this.addTo = function(container) {
      var bg1tex = PIXI.loader.resources["./img/space_stars.jpg"].texture.clone();
      var bg2tex = PIXI.loader.resources["./img/space_galaxy.png"].texture.clone();
      bg1 = new SimpleBackground(2312, 600, -1, bg1tex);
      bg2 = new SimpleBackground(2312, 600, -10, bg2tex);
      bg2.addTo(container);
      bg1.addTo(container);
    };

    this.update = function() {
      bg1.update();
      bg2.update();
    };
  };

  function SimpleBackground(width, height, speed, texture) {
    var self = this;
    var backgroundI = 0;
    var background1 = new PIXI.Sprite(texture);
    var background2 = new PIXI.Sprite(texture);

    this.addTo = function(container) {
      background1.y = 0;
      background2.y = 0;
      container.addChildAt(background1, 0);
      container.addChildAt(background2, 0);
    };

    this.update = function() {
      backgroundI = (backgroundI + speed) % width;
      background1.x = backgroundI;
      background2.x = backgroundI + width;
    };
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
