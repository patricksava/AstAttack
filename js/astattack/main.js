(function(){
  gameLoop = new LNXAstAttack.GameLoop();
  PIXI.loader
   .add("./img/metroid2.png")
   .add("./img/spaceship.pod.1.small.red.png")
   .add("./img/spaceship.pod.1.small.blue.png")
   .add("./img/spaceship.pod.1.small.yellow.png")
   .add("./img/spaceship.pod.1.small.purple.png")
   .add("./img/spaceship.pod.1.small.green.png")
   .add("./img/spaceship.pod.1.green.png")
   .add("./img/spaceship.pod.1.purple.png")
   .add("./img/spaceship.pod.1.yellow.png")
   .add("./img/red_ball.png")
   .add("./img/cyan_ball.png")
   .add("./img/blue_ball.png")
   .add("./img/green_ball.png")
   .add("./img/pink_ball.png")
   .add("./img/yellow_ball.png")
   .add("./img/red_radial.png")
   .add("./img/cyan_radial.png")
   .add("./img/blue_radial.png")
   .add("./img/green_radial.png")
   .add("./img/pink_radial.png")
   .add("./img/yellow_radial.png")
   .add("./img/asteroid_sprite.png")
   .add("./img/earth.png")
   .load(gameLoop.start);
}());
