module objects {
    export class Player extends objects.GameObject {

        private _keyPressed : number;
        private _shots : objects.Laser[];

        private _timeBetweenShots : number = 1;
        private _timer : number = 0;

        // PUBLIC VARIABLES
        public name:string;
        public width:number;
        public height:number;
        public centerX:number;
        public centerY:number;
       
        constructor(animation : createjs.SpriteSheet) {
            super(animation,"player");

            this._shots = [];

            //this.start();
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            var myPlayer =this;

             stage.on("stagemousedown", function(event) {
				
                myPlayer.gotoAndPlay("cast");
                //console.log(player_anim.getNumFrames("cast") - 1);
			}) 
        }

        get getShots() : objects.Laser[] {
            return this._shots;
        }

        public update() : void {

            var newRotation = Math.atan2(stage.mouseY - this.position.y, stage.mouseX - this.position.x) * 180 / Math.PI;
            this.rotation=newRotation;



            super.update();

            this._timer += createjs.Ticker.interval;


            if(controls.UP) {
                this.moveUp();
            }
            
            if(controls.DOWN) {
                this.moveDown();
            }

            if(controls.RIGHT) {
                this.moveRight();
            }

            if(controls.LEFT) {
                this.moveLeft();
            }
            if(controls.SHOOT) {
                this.gotoAndPlay("cast");
            }

            for (let laser of this._shots) {
                laser.update();
            }
           
                //console.log(this.currentAnimationFrame);
             if(this.currentAnimationFrame > player_anim.getNumFrames("cast") - 2){

                 this._shoot();
             }

            //console.log(this._timer);
        }

        private  _shoot():void {
            if(this._timer > 100.0){

                
                let newLaser = new objects.Laser();
                newLaser.setPosition(new objects.Vector2(this.position.x + 25, this.position.y - 18));
                currentScene.addChild(newLaser);
                this._shots.push(newLaser);

                this._timer = 0.0;
            }
       }

        private _onKeyDown(event : KeyboardEvent) {
            switch(event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    controls.SHOOT = true;
                    break;
            }
        }

        private _onKeyUp(event : KeyboardEvent) {
             switch(event.keyCode) {
                case keys.W:
                    controls.UP = false;
                    break;
                case keys.S:
                    controls.DOWN = false;
                    break;
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.SHOOT = false;
                    break;
            }
        }

        public moveUp() {
            this.position.y -= 5;
        }

        public moveDown() {
            this.position.y += 5;
        }

        public moveLeft() {
            this.position.x -= 5;
        }

        public moveRight() {
            this.position.x += 5;
        }
    }
}