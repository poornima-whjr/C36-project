class Food{
    constructor(){
        this.image = loadImage("./images/Milk.png");
        this.foodStock;
        this.lastFed;
        this.lastBottleX;
        this.lastBottleY;
        this.lastBottlePosition={'x':300,'y':200};
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        if(foodStock<0){
            foodStock = 0;
        }
        this.foodStock=foodStock;
    }

    
    display(){
        var x=100, y =100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i = 0; i< this.foodStock; i++){
                if(i%10===0){
                    x=100;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
            this.lastBottlePosition={'x':x,'y':y};
        }
    }
}
