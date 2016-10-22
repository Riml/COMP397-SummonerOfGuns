var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Shooter = (function (_super) {
        __extends(Shooter, _super);
        function Shooter() {
            _super.call(this);
            this._timer = 0;
            this._nextWave = 1;
        }
        Shooter.prototype.start = function () {
            stage.enableDOMEvents(true);
            this._bg = new createjs.Bitmap(assets.getResult("bg_bt"));
            this._bg2 = new objects.GameObject(background_anim, "background");
            //move to some proper place....
            this._bg2.regX = this._bg2.getBounds().width * 0;
            this._bg2.regY = this._bg2.getBounds().height * 0;
            this._scoreTxt = new createjs.Text("Score " + score, "30px Verdana", "#ffFFff");
            this._scoreTxt.x = 10;
            this._scoreTxt.y = 10;
            this._manaBar = new createjs.Shape();
            this._manaBar.graphics.beginFill("#0000ff").drawRect(0, 10, 100, 30);
            this._manaBar.x = config.Screen.WIDTH - 120;
            //console.log("start x:" +this._manaBar.x);
            this.addChild(this._bg);
            this.addChild(this._bg2);
            this.addChild(this._scoreTxt);
            this.addChild(this._manaBar);
            this._mage = new objects.Player(player_anim);
            this.addChild(this._mage);
            this.enemies = [];
            this.enemySpawn();
            //this._enemy = new objects.Enemy("enemy");
            //this.addChild(this._enemy);
            stage.addChild(this);
        };
        Shooter.prototype.enemySpawn = function () {
            var new_enemy = new objects.Enemy(enemy_anim);
            this.addChild(new_enemy);
            this.enemies.push(new_enemy);
            this._timer = 0;
        };
        Shooter.prototype.update = function () {
            // Check collisions
            for (var _i = 0, _a = this._mage.getActiveGuns; _i < _a.length; _i++) {
                var gun = _a[_i];
                var _loop_1 = function (i) {
                    this_1.enemies.forEach(function (enemy) {
                        collision.check(i, enemy);
                    });
                };
                var this_1 = this;
                for (var _b = 0, _c = gun.getShots; _b < _c.length; _b++) {
                    var i = _c[_b];
                    _loop_1(i);
                }
            }
            this._scoreTxt.text = "Score : " + score;
            this._manaBar.scaleX = mana / 100;
            this._mage.update();
            this.enemies.forEach(function (enemy) {
                enemy.update();
            });
            globalTimer += createjs.Ticker.interval;
            if (globalTimer > 7000 * this._nextWave) {
                this._nextWave++;
                curretWave++;
                console.log("next level");
            }
            this._timer += createjs.Ticker.interval;
            if (this._timer > (30000 * Math.random()) / (curretWave * 2) + 50)
                this.enemySpawn();
        };
        return Shooter;
    }(objects.Scene));
    scenes.Shooter = Shooter;
})(scenes || (scenes = {}));
//# sourceMappingURL=shooter.js.map