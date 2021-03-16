class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image = loadImage("images/r1.png")
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }

    getFoodStock(){
        return this.foodStock
    }

    bedroom(){
        background(bImg,550,500);
    }

    garden(){
        background(gImg,550,500);
    }

    washroom(){
        background(wImg,550,500)
    }

    display(){
      var x=80,y=100;


      if(this.foodStock!=0){
          for(var i=0; i<this.foodStock; i++){
              if(i%10==0){
                  x=80;
                  y=y+50;
              }
              image(this.image,x,y,50,50);
              x=x+30;
          }
      }
    }
}