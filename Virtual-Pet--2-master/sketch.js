//Create variables here
var dog, happyDog;
var database;
var foodS,foodStock;
 var dogimg,happydogimg;
 var fedTime,lastFed,foodObj
 var feed,addFood;

function preload()
{
  happydogimg = loadImage("images/happydog.png");
  dogimg = loadImage("images/Dog.png");
}

function setup() {
	createCanvas(1000, 400);
  dog = createSprite(800,200,150,150);
  dog.addImage(dogimg);
  dog.scale = 0.15;
  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readstock);

  foodObj = new Food()

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addfoodstock);

}


function draw() {  
  background(46,139,87);
  
  foodObj.display()

  fedTime=database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  
  if(lastFed>=12){
    text("Last Fed:"+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Fed:12AM", 350,30);
  }else{
    text ("Last Fed:" + lastFed + "Am", 350,30 )
  }

  drawSprites();
  //add styles here
}

function readstock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);  
}

function writestock(x){
  if (x<=0){
    x=0
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    food:x
  })
}

function addfoodstock (){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

  function feedDog (){
    dog.addImage(happyDog);
     if(foodObj.getFoodStock()<=0){
       foodObj.updateFoodStock(foodObj.getFoodStock()*0)
     }else{
      foodObj.updateFoodStock(foodObj.getFoodStock()-1) 
     }
     database.ref('/').update({
       Food:foodObj.getFoodStock(),
       FeedTime:hour()
     })
  } 

