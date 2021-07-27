var ghost;
var ghostImage,ghostJumpingImage;
var doorImage;
var door;
var path;
var pathImage;
var gameState = 'PLAY';
var spikes;
var spikesImage;
var spikesGroup;
var doorGroup;
var gameOver,gameOverImage;
var invisibleFloor;
var invisibleFloorGroup;

function preload(){
  
  ghostImage = loadImage("ghost-standing.png");
  ghostJumpingImage = loadImage("ghost-jumping.png");
  doorImage = loadImage("door.png");
  pathImage = loadImage("tower.png");
  spikesImage = loadImage("climber.png");
  gameOverImage = loadImage("GAME OVER.png")
}


function setup(){
  createCanvas(500,800);
 background("grey");
  
  path = createSprite(250,400,400,800);
  ghost = createSprite(250,700,20,20);
  ghost.setCollider('circle',0,0,150)
  
  path.velocityY = 3;
  
  path.addImage("brick",pathImage);
  path.scale = 0.8;
  
  ghost.addImage("scaryGhost",ghostImage);
  ghost.scale = 0.4;
  
  spikesGroup = new Group();
  doorGroup = new Group();
  invisibleFloorGroup = new Group();
}

function draw(){
  
  
  
    if(gameState === 'PLAY' ){

    if(path.y > 500){
      path.y = 400
    }

    if(keyDown('space')){
      ghost.velocityY = -5;
    }

       if(keyWentUp('space')){
      ghost.velocityY = 0;
    }

    if(keyDown('LEFT_ARROW')){
      ghost.x = ghost.x - 3;
    }

  if(keyDown('RIGHT_ARROW')){
      ghost.x = ghost.x + 3;
    }
       
    if(frameCount % 200 === 0){
      spawnSpikes();
    }
      
    if(ghost.isTouching(invisibleFloorGroup)){
      ghost.velocityY = 0;
     console.log('Im here');
    }
      
    if(ghost.isTouching(spikesGroup)||(ghost.y > 800)){
      gameState = 'END';
      console.log(gameState);
    } 
      
  ghost.velocityY =  ghost.velocityY + 0.8;
      
  }else if(gameState === 'END') {
  path.velocityY = 0;
  ghost.velocityY = 0;
     
  ghost.visible = false;
  spikesGroup.destroyEach();
  doorGroup.destroyEach();
  
    createGAMEOVER();
   
  }
  
  
  if(path.y > 500){
    path.y = 400
  }
    
  drawSprites();
}

function spawnSpikes(){
  door = createSprite(0,-30,20,20)
  door.x = Math.round (random(85,400));
  
  door.addImage('door.png',doorImage)

  door.velocityY = 3;

  spikes = createSprite(0,40,20,20)
  
  spikes.x = door.x;
    
  spikes.addImage('spike.png',spikesImage)

  spikes.velocityY = 3;

  invisibleFloor = createSprite(0,24,90,5);
  invisibleFloor.visible = false;
  invisibleFloor.x = door.x;
  invisibleFloor.velocityY = 3;
 
  spikesGroup.add(spikes);
  doorGroup.add(door);
  invisibleFloorGroup.add(invisibleFloor);
  
  spikes.lifetime = 270;
  door.lifetime = 270;

  ghost.depth = door.depth + 1;
}

function createGAMEOVER(){
  gameOver = createSprite(250,400,20,20);
  gameOver.addImage('GAMEOVER',gameOverImage);
  gameOver.scale = 0.2;
}