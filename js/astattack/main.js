(function(){
  gameLoop = new LNXAstAttack.GameLoop();
  PIXI.loader
   .add("./img/metroid2.png")
   .add("./img/earth.png")
   .load(gameLoop.start);
}());
