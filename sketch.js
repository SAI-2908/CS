
var jake, jake_running;
var ground, invisibleGround, groundImg;
var  coinImg;
var bomb, bombImg;
var energyDrink, energyDImg;
var power, powerImg;
var END =0;
var PLAY =1;
var gameState = PLAY;
var EDG;

var score=0;
var gameOver, restart;
var cbi,cbG,cb;
var edges;
var coinG,bombG,eDG,powerG;
var gameOImg;
var rImg;

function preload() {
  jake_running = loadAnimation("jake3.png", "jake4.PNG", "jake5.png");
  coinImg = loadImage("coin.png")
  bombImg = loadImage("bomb.png")
  
  powerImg = loadImage("power.png")
  rImg = loadImage("restart.png")
  gameOImg = loadImage("gameOImg.png")
  groundImg = loadImage("path.png")
  energyDImg = loadImage("energyDrink.png")
  cbi = loadImage("coinbag.png")
}

function setup() {
//createCanvas(400, 500);


  
//create a ground sprite
 createCanvas(500, 500);
  ground = createSprite(250,100)
  ground.addImage(groundImg)
  ground.scale = 1.6
  ground.velocityY = 0.5
  
  //create a trex sprite
jake = createSprite(250,450,20,50);
jake.addAnimation("running", jake_running);
jake.scale = 0.8;
  //jake.debug= true;
  //jake.setCollider("rectangle",0,0,10,50)
  

gameOver = createSprite(250,150);
gameOver.addImage(gameOImg);
gameOver.scale = 0.45;
gameOver.visible = false; 
  
restart = createSprite(250,260);
restart.addImage(rImg);
restart.scale = 0.35;
restart.visible = false; 
  
   coinG = new Group();
  bombG = new Group();
  EDG = new Group();
  cbG = new Group();
  
}

function draw() {
 background(220);
  textSize(20);
  fill("white");
  text("Score: "+ score,400,50);
  
  if(gameState===PLAY){
    jake.visible = true;
  
   ground.velocityY = -(6 + 2*score/150);
  
   jake.x = World.mouseX;
  
   edges= createEdgeSprites();
   jake .collide(edges);
  
  //code to reset the background
  if(ground.y < 0 ){
    ground.y = height/2;
    
  }
  spwanCoins();
    spwanBombs();
    spwaneDG();
    spwanCB();
    
  if(coinG.isTouching(jake)){
    
    coinG.destroyEach();
    score = score +10
    
  }
  if(cbG.isTouching(jake)){
    
    cbG.destroyEach();
    score = score +25
    
  }
  if(EDG.isTouching(jake)){
    
    EDG.destroyEach();
    score = score +15
    
  }

    if(bombG.isTouching(jake)){
      gameState = END;
    }
    
   }
    if( gameState === END) {
      ground.velocityY = 0;
      jake.visible = false;
      coinG.destroyEach();
      bombG.destroyEach();
      EDG.destroyEach();
      cbG.destroyEach();
      gameOver.visible = true;
      restart.visible = true;
      if(mousePressedOver(restart)){
        gameOver.visible = false;
  restart.visible = false;
  score = 0;
  gameState = PLAY
      }
    }
  
drawSprites();
  textSize(20); fill(255); text("Score: "+ score,150,30);
}
  
function spwanCoins(){
  if (World.frameCount % 85 === 0) {
    var coin = createSprite(100,0,40,10);
    coin.x = Math.round(random(50,450));
    coin.addImage(coinImg);
    coin.scale = 0.15
    coin.velocityY = 5;
    //coin.debug = true;
    //coin.setCollider("circle",0,0,15)
     //assign lifetime to the variable
    coin.lifetime = 90;
    
    
    
    coinG.add(coin);
}
}

function spwanCB(){
  if (World.frameCount % 350 === 0) {
    var cb = createSprite(100,0,40,10);
    cb.x = Math.round(random(50,450));
    cb.addImage(cbi);
    cb.scale = 0.2
    cb.velocityY = 6;
    //coin.debug = true;
    //coin.setCollider("circle",0,0,15)
     //assign lifetime to the variable
    cb.lifetime = 84;
    
    
    
    cbG.add(cb);
}
}


function spwanBombs(){
if (World.frameCount % 280 === 0) {
    var bomb = createSprite(150,0,40,10);
    bomb.x = Math.round(random(50,450));
    bomb.addImage(bombImg);
    bomb.scale = 0.25;
    bomb.velocityY = 3;
    
     //assign lifetime to the variable
    bomb.lifetime = 167;;
    
    
    //add each cloud to the group
    bombG.add(bomb);
}
}
function spwaneDG(){
  if (World.frameCount % 190 === 0) {
      var eDG = createSprite(150,0,40,10);
      eDG.x = Math.round(random(50,450));
      eDG.addImage(energyDImg);
      eDG.scale = 0.15;
      eDG.velocityY = 4;
      
       //assign lifetime to the variable
      eDG.lifetime = 120;;
      
      
      //add each cloud to the group
      EDG.add(eDG);
  }
  }
function restart(){
  
}
