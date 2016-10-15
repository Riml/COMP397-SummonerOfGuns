module scenes {
    export class Shooter extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _ship : objects.Player;
        public enemies : objects.Enemy[];
        private _timer : number=0;

        constructor() {
            super();
        }

        public start() : void {
            stage.enableDOMEvents(true);
            this._bg = new createjs.Bitmap(assets.getResult("Space_BG"));
            this.addChild(this._bg);

            this._ship = new objects.Player("ship");
            this.addChild(this._ship);
            
            this.enemies =[];
            this.enemySpawn();



            //this._enemy = new objects.Enemy("enemy");
            //this.addChild(this._enemy);

            stage.addChild(this);

           
        }

        public enemySpawn():void{

            var new_enemy = new objects.Enemy("enemy");
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
               
            }

            this._ship.update();
            this.enemies.forEach(enemy => {
           //terrible soultion for terrible language     
                    if(enemy.name=="dead_name")
                      return;
                    enemy.update();
                });
           

            this._timer += createjs.Ticker.interval;
            if(this._timer>1000)
                this.enemySpawn();
        }
    }
}