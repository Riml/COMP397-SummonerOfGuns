module objects {
    export class Player extends objects.GameObject {

        private _keyPressed : number;
        

        private _timeBetweenShots : number = 1;
        private _timer : number = 0;
        private _activeGuns : objects.Gun[];
        private _mg_summoned:boolean=false;
       

        // PUBLIC VARIABLES
        public name:string;
        public width:number;
        public height:number;
        public centerX:number;
        public centerY:number;
       
        constructor(animation : createjs.SpriteSheet) {
            super(animation,"player");

           

            this._activeGuns = [];
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            var myPlayer =this;
            playerCasting=false;
            this.position = new objects.Vector2(900,514);
            
           

             /*stage.on("stagemousedown", function(event) {
				
               
                if(!playerCasting && mana >10){
                 
                    mana-=10;                  
                    myPlayer.gotoAndPlay("cast");
                    playerCasting=true;
                    
                }
              


                //console.log(player_anim.getNumFrames("cast") - 1);
			})
            */ 
        }

        

        public update() : void {
            
            super.update();
            
            for (let gun of this._activeGuns) {
                gun.update();
            }

            this._timer += createjs.Ticker.interval;

            if(controls.RIGHT) {this.moveRight();}
            if(controls.LEFT) {this.moveLeft();}
            if(controls.N1) {
                
                if(mana>50 ){
                    mana-=50;
                    
                    this.gotoAndPlay("cast");
                }
            
        }
            
            if(this.currentAnimationFrame > player_anim.getNumFrames("cast") - 2 && this._mg_summoned==false){                
                playerCasting=false;
                this._mg_summoned=true;
                this._summon();
            }
        }
        get getActiveGuns() : objects.Gun[] {
            return this._activeGuns;
            
        }

        private  _summon():void { 
            let newMinigun = new objects.Gun(minigun_anim,"minigun");
            newMinigun.position = new objects.Vector2(this.x-40,this.y-60);
            this._activeGuns.push(newMinigun)
            currentScene.addChild(newMinigun);
              
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
               case keys.N1:
                    console.log("1 key pressed");
                    controls.N1 = true;
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
                case keys.N1:
                    controls.N1 = false;
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