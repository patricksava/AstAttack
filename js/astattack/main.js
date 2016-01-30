(function(){
  gameLoop = new LNXAstAttack.GameLoop();
  PIXI.loader
   .add("./img/metroid2.png")
   .load(gameLoop.start);
}());
