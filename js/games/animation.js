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
      texture.frame = new PIXI.Rectangle(image.x, image.y, image.width, image.height);
      framesOfCurrentImage -= 1;
      if(framesOfCurrentImage <= 0) {
        currentImageIndex = currentImageIndex + 1;

        if(currentImageIndex === images.length) {
          callbacks.emit("animationEnd");
        }
        currentImageIndex = currentImageIndex % images.length;
        framesOfCurrentImage = images[currentImageIndex].duration;
      }
      sprite.x = x;
      sprite.y = y;
    };

    this.reset = function() {
      currentImageIndex = 0;
      frameDuration = images[currentImageIndex].duration;
    };
  };
}(LNXGames = window.LNXGames || {}));
