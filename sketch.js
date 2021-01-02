//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock, foodObj;
var fedTime, lastFed, feedBtn, foodBtn, petName, input, changeBtn;

function preload()
{
  happyDog = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);

  database.ref("petName").on("value", function(data){
   petName = data.val();
  });


  createCanvas(500, 500);
  
  foodObj = new Food();

  feedBtn = createButton('Feed the Dog');
  foodBtn = createButton('Add food');

  feedBtn.position(500,500);
  foodBtn.position(600,500);
  
  feedBtn.mousePressed(feedDog);
  foodBtn.mousePressed(addFood);

  input = createInput();
  changeBtn = createButton('Change Pet Name');
   
  input.position(420,470);
  changeBtn.position(600,470);
  
  changeBtn.mousePressed(changeName);

  dog = createSprite(400,250);
  dog.addImage(dogImg);
  dog.scale =0.1;
}


function draw() {  
  background(46, 139, 87);
    if(foodS!=undefined){
    
    fedTime=database.ref("FeedTime");
    fedTime.on("value", function(data){
      lastFed = data.val();
    })

    textSize(20);
    fill("red");
    
    text("Food remaining : "+ foodS, 180,100);

    if(lastFed >=12){
      text(petName+" was last fed at : "+ lastFed % 12 +"AM", 100,50);  
    }else if(lastFed === 0){
      text(petName+" was last fed at : 12AM", 100,50);
    }else{
      text(petName+" was last fed at : "+lastFed, 100,50);
    }

    

    foodObj.display();
    dog.x = foodObj.lastBottlePosition.x;
    dog.y = foodObj.lastBottlePosition.y;

    drawSprites();
  }


}

function feedDog(){
  if(foodObj.getFoodStock()===0){
    dog.addImage(dogImg);
  }else{
    
    dog.addImage(happyDog);
  }
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
  dog.addImage(dogImg);
  
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function changeName(){
  database.ref("/").update({
    petName:input.value()
  });
}