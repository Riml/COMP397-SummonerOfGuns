module objects {
    export class Enemy extends objects.GameObject {

        private _move : objects.Vector2;
        private _speed : number;

        // public variables
        public name:string;
        //public width:number;
        //public height:number;
        public center:objects.Vector2;
      

        constructor(animation : createjs.SpriteSheet) {
            super(animation,"enemy");

            this.name = "enemy";
            this.position = new objects.Vector2(-90, config.Screen.CENTER_Y+(Math.random()-0.5)*400);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this._speed = -0.5 -curretWave*Math.random();
            

        }

        public update() : void {
            super.update();
            if(!gamelost)
                this.position.x -= this._speed;

            if (this.position.x > config.Screen.WIDTH && this.dead == false){
                gamelost=true;
            }
        }
    }
}