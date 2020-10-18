var tower, towerImg
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";
var spookySound;


function preload(){
towerImg = loadImage("tower.png");
doorImg = loadImage("door.png");
climberImg = loadImage("climber.png");
ghostImg = loadImage("ghost-standing.png");
spookySound = loadSound ("spooky.wav");

  
doorsGroup = new Group();
climbersGroup = new Group();
invisibleBlockGroup = new Group();
}

function setup(){
createCanvas (600, 600);

tower = createSprite(300, 300);
tower.addImage(towerImg);
tower.velocityY = 1;
  
ghost = createSprite(300, 300);
ghost.addImage(ghostImg);
ghost.scale = 0.3;
  
spookySound.loop();
 
}

function draw(){
background (0);
  
if (gameState === "play"){
if (keyDown("right")){
ghost.x = ghost.x+3;
}

if (keyDown("left")){
ghost.x = ghost.x-3;
}

if (keyDown("space")){
ghost.velocityY = -5;
}
  
if (tower.y>400){
tower.y = 300;
}
ghost.velocityY = ghost.velocityY+0.5; 
  



if (climbersGroup.isTouching(ghost)){
ghost.velocityY = 0;
}
if (invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
ghost.destroy();
gameState = "end";
}  
  
spawnDoors();

drawSprites();
} 
if (gameState === "end"){
stroke ("yellow");
fill ("yellow")
textSize (30);
text ("GAME OVER", 230, 250);
}

}

function spawnDoors(){
if (frameCount%250 === 0){
door = createSprite(200, -50);
door.velocityY = 1;
door.addImage(doorImg);
door.x = Math.round(random(120, 400));
door.lifetime = 800;
doorsGroup.add(door);

ghost.depth = door.depth;
ghost.depth = ghost.depth + 1;


climber = createSprite(200, 10);
climber.addImage(climberImg);
climber.x = door.x;
climber.velocityY = 1;
climber.lifetime = 800;
climbersGroup.add(climber);
  
invisibleBlock = createSprite(door.x, 15, climber.width, 2);
invisibleBlock.velocityY = 1;
invisibleBlock.visible = false;
invisibleBlockGroup.add(invisibleBlock);

}
  
}

