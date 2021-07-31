//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
  
}

function setup() {
	createCanvas(500, 500);

  database=firebase.database();
  foodObj=new Food()

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  feed=createButton("FEED THE DOG")
feed.position(700,95)
feed.mousePressed(feedDog)

addFood=createButton("ADD FOOD")
addFood.position(800,95)
addFood.mousePressed(addFoods)
}


function draw() {  

  background(46, 139, 87);  

  foodObj.display();

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data)
  {
    lastFed=data.val;
  })


 
  drawSprites();
  fill(255,255,254)
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Fed: "+lastFed%12+"PM",350,30);
  }
  else if(lastFed==0)
  {
    text("Last Fed: 12AM",350,30);
  }
  else{
    text("Last Fed: "+lastFed+"AM",350,30);
  }
  //add styles here

}
function readStock(data)
{
foodS=data.val();
foodObj.updateFoodStock(foodS)
}





