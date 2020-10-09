var monkey, monkeyImage;

var bananaImage,bananaImage1,bananaGroup;
var obstacleImage, obstacleImage1,obstacleGroup;

var fakeGround;

var backgroundImage,backgroundI;

var score;

var lifes;

var gameState;

function preload(){
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage1 = loadImage("banana.png");
  
  obstacleImage1 = loadImage("stone.png");
  
  backgroundI = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(464,292);
  
  backgroundImage = createSprite(215,100,5,5);
  backgroundImage.addImage(backgroundI);
  backgroundImage.scale = 0.7;
  
  monkey = createSprite(100,240,20,20);
  monkey.addAnimation("image",monkeyImage);
  monkey.scale = 0.1;
  
  fakeGround = createSprite(90,260,45,5);
  fakeGround.visible = false;
  
  score = 0;
  
  lifes= 2;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  monkey.setCollider("rectangle",0,0);
  
  PLAY = 1;
  END = 0;
  gameState = "play";
  
}

function draw() {
  background("white");
  
  if(gameState === "play"){
    
     if(monkey.isTouching(bananaGroup)){
        bananaGroup.destroyEach(); 
        score = score + 2;      
     }
    
    if(monkey.isTouching(obstacleGroup)) {
        obstacleGroup.destroyEach();
        monkey.scale = 0.1;
        score = 0;
        lifes = lifes - 1;
    }
    
    if(keyDown("space") && monkey.y >= 226){
        monkey.velocityY = -10;
    } 
    
        monkey.velocityY = monkey.velocityY + 0.4;
    
        monkey.collide(fakeGround);
    
    switch(score){
        case 10: monkey.scale = 0.2;
                break;
        case 20: monkey.scale = 0.3;
                break;
        case 30: monkey.scale = 0.4;
                break;
        case 40: monkey.scale = 0.5;
                break;
        default: break;        
     }
    
    banana();
    obstacle();
  }

  if(lifes === 0){
      gameState = "end";
  }
  
  if(gameState === "END"){
      text("Press 'R' to restart");
      
  }
  
  if(keyDown("space") &&  gameState === "serve"){
     serve();
     gameState = "play";
  }
  
  if(keyDown("r") && gameState === "END"){
     gameState = "serve";
     score = 0;
     lifes = 2;
  }
  
  console.log(monkey.y);
  
  
  
  drawSprites();
  
  stroke("white");
  textSize(18);
  fill("whith");
  text("/Scroe:"+score,390,15);
  text("Lifes:"+lifes,335,15);
}

function banana () {
  if (World.frameCount % 80 === 0) {
    bananaImage = createSprite(490,50,20,20);
    bananaImage.addImage(bananaImage1);
    bananaImage.scale = 0.05;
    bananaImage.y = random(50,130);
    bananaImage.velocityX = -5;
    bananaImage.lifetime = 102;
    bananaGroup.add(bananaImage);
    
    bananaImage.setCollider("circle",1,1);
  }
}

function obstacle () {
  if (World.frameCount % 180 === 0) {
    obstacleImage =    createSprite(450,230,10,10);
    obstacleImage.addImage(obstacleImage1);
    obstacleImage.scale = 0.15;
    obstacleImage.velocityX = -5;
    obstacleImage.lifetime = 102;
    obstacleGroup.add(obstacleImage);
    
      obstacleImage.setCollider("circle",0,0);
  }
}