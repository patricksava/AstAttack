(function(namespace) {
  namespace.Animation = function(sprite, images) {
    var texture = sprite.texture;
    var currentImageIndex = 0;
    var framesOfCurrentImage = images[currentImageIndex].duration;

    this.toNextFrame = function(x, y) {
      var image = images[currentImageIndex];
      texture.frame = new PIXI.Rectangle(image.x, image.y, image.width, image.height);
      framesOfCurrentImage -= 1;
      if(framesOfCurrentImage <= 0) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        framesOfCurrentImage = images[currentImageIndex].duration;
      }
      if(images[currentImageIndex].flip) {
        sprite.scale.x = -1;
        sprite.x = x + sprite.width;
        sprite.y = y;
      } else {
        sprite.scale.x = 1;
        sprite.x = x;
        sprite.y = y;
      }
    };

    this.reset = function() {
      currentImageIndex = 0;
      frameDuration = images[currentImageIndex].duration;
    };
  };
}(LNXGames = window.LNXGames || {}));
