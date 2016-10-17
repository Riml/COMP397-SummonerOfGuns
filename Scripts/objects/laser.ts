module objects{
    export class Laser extends objects.GameObject {

        private _speed : number = 15;
        
        //speed adjusting varibales to ensure that
        //laser moves to the mouse with constant speed
        private _scaleX:number;
        private _scaleY:number;

        constructor() {
            super(null,"bullet","bullet",18,1);
        }

        public start() : void  {

            
       
        }
         public handleComplete():void {
        //Tween complete
        }


        public update() : void {
            super.update();
            this.position.x += this._scaleX*this._speed;
            this.position.y += this._scaleY*this._speed;
           
        }

        public setPosition(newPosition:Vector2) : void {

            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
            var MX =stage.mouseX+50*(0.5-Math.random());
            var MY =stage.mouseY+50*(0.5-Math.random());;

            this._scaleY= ( 
                (MY - this.position.y)/
                (Math.abs((MY - this.position.y))+Math.abs((MX - this.position.x)))
                );
            this._scaleX= ( 
                (MX - this.position.x)/
                  (Math.abs((MY - this.position.y))+Math.abs((MX - this.position.x)))
                );
            //console.log("player pos " +this.position.x+" : "+this.position.y);
            //console.log("mouse pos " +stage.mouseX+" : "+stage.mouseY);         
            //console.log("laser scales " +this._scaleX+" : "+this._scaleY);        


            var newRotation = Math.atan2(stage.mouseY - this.position.y, stage.mouseX - this.position.x) * 180 / Math.PI;
            this.rotation=newRotation;
        }
    }
}