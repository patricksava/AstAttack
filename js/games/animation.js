(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.Animation = function(sprite, images, texture) {
    var callbacks = Callbacks.initializeFor(this);
    if(!texture) {
      texture = sprite.texture;
    }
    var currentImageIndex = 0;
    var framesOfCurrentImage = images[currentImageIndex].duration;

    this.toNextFrame = function(x, y) {
      sprite.texture = texture;
      var image = images[currentImageIndex];
      if(image.width && image.height) {
        texture.frame = new PIXI.Rectangle(image.x, image.y, image.width, image.height);
      }
      framesOfCurrentImage -= 1;
      if(framesOfCurrentImage <= 0) {
        currentImageIndex = currentImageIndex + 1;

        if(currentImageIndex === images.length) {
          callbacks.emit("animationEnd");
        }
        currentImageIndex = currentImageIndex % images.length;
        framesOfCurrentImage = images[currentImageIndex].duration;
      }
      sprite.x = x + (image.offsetX || 0);
      sprite.y = y + (image.offsetY || 0);
    };

    this.reset = function() {
      currentImageIndex = 0;
      frameDuration = images[currentImageIndex].duration;
    };
  };

  var animsId = 0;
  var anims = {};
  namespace.Animation.textAnimation = function(text, x, y) {
    var id = animsId++;
    var spriteText = new PIXI.Text(text, {font : '26px Charybdis', fill : 0xffffff});
    var anim = new namespace.Animation(spriteText, [
      {duration: 10},
      {duration: 10, offsetY: -1},
      {duration: 10, offsetY: -2},
      {duration: 10, offsetY: -3},
      {duration: 10, offsetY: -4},
      {duration: 10, offsetY: -5}
    ]);
    anim.x = x;
    anim.y = y;
    anims[id] = anim;
    anim.listen("animationEnd", function() {
      delete anims[id];
      //sprite.destroy();
    });
    return spriteText;
  };

  namespace.Animation.update = function() {
    for(var id in anims) {
      anims[id].toNextFrame(anims[id].x, anims[id].y);
    }
  };
}(LNXGames = window.LNXGames || {}));
