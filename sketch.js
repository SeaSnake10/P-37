//Create variables here
var dog, happyDog, database, foodS, foodStock, dImg;
var feed, addFood, foodObj, lastFed;
var bImg, wImg, gImg, readState, changeState, sadDog;

function preload()
{
	//load images here
  dImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bImg = loadImage("images/bed2.png");
  wImg = loadImage("images/cr2.png");
  gImg = loadImage("images/flower2.png");
  sadDog = loadImage("images/sad.png")
}

function setup() {
	createCanvas(900, 700);
  dog = createSprite(850,300,100,10);
  dog.addImage(dImg);
  dog.scale = 0.15;

  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  feed=createButton("Feed the Dog");
  feed.position(725,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(825,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

  readState=database.ref("gameState");
  readState.on("value",function(data){
    gameState=data.val();
  });
}


function draw() {  
  background(46, 139, 87)
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val()
  });
  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  text("Food:" + foodS, 200, 100);
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12 + "PM",200,60);
  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30);
  }else{
    text("Last Feed : "+lastFed + "AM",200,60);
  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
}

function readStock(data){
  foodS=data.val();
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  foodObj.updateFoodStock(foodObj.getFoodStock()+1)

  database.ref('/').update({
    Food:foodObj.getFoodStock()
  })
}