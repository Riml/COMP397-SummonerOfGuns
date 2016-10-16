module scenes {
    export class Shooter extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _bg2 : objects.GameObject;
        private _ship : objects.Player;
        public enemies : objects.Enemy[];
        private _timer : number=0;
      
        private _scoreTxt: createjs.Text;

        constructor() {
            super();
        }

        public start() : void {
            stage.enableDOMEvents(true);
            this._bg = new createjs.Bitmap(assets.getResult("bg_bt"));            
                
            this._bg2 = new objects.GameObject(background_anim, "background");
            //move to some proper place....
            this._bg2.regX = this._bg2.getBounds().width*0;
            this._bg2.regY = this._bg2.getBounds().height *0;

            this._scoreTxt = new createjs.Text("Score "+score,"30px Verdana","#ffFFff");
            this._scoreTxt.x=10;
            this._scoreTxt.y=10;
             



            this.addChild(this._bg);
            this.addChild(this._bg2);
            this.addChild(this._scoreTxt);

            this._ship = new objects.Player(player_anim);
            this.addChild(this._ship);
            
            this.enemies =[];
            this.enemySpawn();



            //this._enemy = new objects.Enemy("enemy");
            //this.addChild(this._enemy);

            stage.addChild(this);

           
        }

        public enemySpawn():void{

            var new_enemy = new objects.Enemy(enemy_anim);
            this.addChild(new_enemy);
            this.enemies.push(new_enemy)
            this._timer = 0;

        }

        public update() : void {
            // Check collisions
            for(let i of this._ship.getShots) {
                this.enemies.forEach(enemy => {
                     collision.check(i, enemy);
                });
            this._scoreTxt.text="Score : "+ score;   
               
            }

            this._ship.update();
            this.enemies.forEach(enemy => {
                            enemy.update();
                });
           

            this._timer += createjs.Ticker.interval;
            if(this._timer>1000)
                this.enemySpawn();
        }
    }
}