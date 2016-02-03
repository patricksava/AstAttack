(function(namespace) {
  var Config = LNXGames.Config;

  var FRONT_PLANET_SPRITES = [];
  (function() {
    var textures = PIXI.loader.resources["./img/frontPlanets.json"].textures;
    for(var path in textures) {
      FRONT_PLANET_SPRITES.push(new PIXI.Sprite(textures[path]));
    }
  }());

  var BACK_PLANET_SPRITES = [];
  (function() {
    var textures = PIXI.loader.resources["./img/backPlanets.json"].textures;
    for(var path in textures) {
      BACK_PLANET_SPRITES.push(new PIXI.Sprite(textures[path]));
    }
  }());

  var BACK_BACK_PLANET_SPRITES = [];
  (function() {
    var textures = PIXI.loader.resources["./img/backBackPlanets.json"].textures;
    for(var path in textures) {
      BACK_BACK_PLANET_SPRITES.push(new PIXI.Sprite(textures[path]));
    }
  }());

  namespace.Background = function() {
    var bg1 = null;
    var bg2 = null;
    var bg3 = null;

    this.addTo = function(container) {
      var bg1tex = PIXI.loader.resources["./img/space_stars.jpg"].texture.clone();
      var bg2tex = PIXI.loader.resources["./img/space_galaxy.png"].texture.clone();
      bg1 = new SimpleBackground(2312, 600, -0.4, bg1tex);
      bg2 = new SimpleBackground(2312, 600, -5.4, bg2tex);
      bg3 = new ObjectsBackground(BACK_BACK_PLANET_SPRITES, -0.8, Config.screenWidth(), Config.screenHeight(), 0.5, 10);
      bg4 = new ObjectsBackground(BACK_PLANET_SPRITES, -2.5, Config.screenWidth(), Config.screenHeight(), 2, 15);
      bg5 = new ObjectsBackground(FRONT_PLANET_SPRITES, -3.5, Config.screenWidth(), Config.screenHeight(), 10, 30);
      bg2.addTo(container, 0);
      //bg5.addTo(container, 0);
      bg4.addTo(container, 0);
      bg3.addTo(container, 0);
      bg1.addTo(container, 0);
    };

    this.update = function() {
      bg1.update();
      bg2.update();
      bg3.update();
      bg4.update();
      bg5.update();
    };
  };

  function ObjectsBackground(sprites, speed, width, height, minFreq, maxFreq) {
    var bgContainer = new PIXI.Container();
    var onScreen = {};
    var frame = 0;
    var nextFrame = 0;
    var FREQ_MIN = minFreq*60;
    var FREQ_MAX = maxFreq*60;

    this.addTo = function(container, level) {
      if(level === -1) {
        container.addChild(bgContainer);
      } else {
        var l = level || 0;
        container.addChildAt(bgContainer, l);
      }
    };

    this.update = function() {
      //console.log(speed, sprites.length);
      if(frame === nextFrame) {
        var planet = popRandomPlanet();
        var id = frame;
        planet.x = width;
        var minY = height/4 - planet.height;
        var maxY = 3*height/4;
        planet.y = minY + Math.floor(Math.random()*(maxY - minY));
        onScreen[id] = planet;
        bgContainer.addChild(planet);
        nextFrame = frame + FREQ_MIN + Math.floor(Math.random()*(FREQ_MAX - FREQ_MIN));
      }

      for(var pid in onScreen) {
        var planet = onScreen[pid];
        planet.x += speed;
        if(planet.x < -planet.width) {
          console.log(pid, planet.x);
          bgContainer.removeChild(planet);
          delete onScreen[pid];
          sprites.push(planet);
        }
      }

      frame++;
    };

    function popRandomPlanet() {
      var i = Math.floor(Math.random()*sprites.length);
      return sprites.splice(i, 1)[0];
    };
  }

  function SimpleBackground(width, height, speed, texture) {
    var self = this;
    var backgroundI = 0;
    var background1 = new PIXI.Sprite(texture);
    var background2 = new PIXI.Sprite(texture);

    this.addTo = function(container, level) {
      background1.y = 0;
      background2.y = 0;
      if(level === -1) {
        container.addChild(background1);
        container.addChild(background2);
      } else {
        var l = level || 0;
        container.addChildAt(background1, l);
        container.addChildAt(background2, l);
      }
    };

    this.update = function() {
      backgroundI = (backgroundI + speed) % width;
      background1.x = backgroundI;
      background2.x = backgroundI + width;
    };
  };

}(LNXAstAttack = window.LNXAstAttack || {}));
