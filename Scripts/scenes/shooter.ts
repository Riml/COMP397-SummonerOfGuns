module scenes {
    export class Shooter extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _bg2 : objects.GameObject;
        private _mage : objects.Player;
        public enemies : objects.Enemy[];
        private _timer : number=0;
        private _manaBar : createjs.Shape;
      
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

            this._manaBar = new createjs.Shape();
            this._manaBar.graphics.beginFill("#0000ff").drawRect(0,10,100,30);
            this._manaBar.x=config.Screen.WIDTH-120;
            //console.log("start x:" +this._manaBar.x);
            
             



            this.addChild(this._bg);
            this.addChild(this._bg2);
            this.addChild(this._scoreTxt);
            this.addChild(this._manaBar);

            this._mage = new objects.Player(player_anim);
            this.addChild(this._mage);
            
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
            for(let gun of this._mage.getActiveGuns) {
                for(let i of gun.getShots) {
                this.enemies.forEach(enemy => {
                     collision.check(i, enemy);
                
                });
                }
            }
         
            this._scoreTxt.text="Score : "+ score;           
            this._manaBar.scaleX=mana/100;
            this._mage.update();
            this.enemies.forEach(enemy => {
                enemy.update();
            });

            this._timer += createjs.Ticker.interval;
            if(this._timer>8000*Math.random())
                this.enemySpawn();
        }
    }
}