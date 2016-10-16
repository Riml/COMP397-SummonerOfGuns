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
        }
        Shooter.prototype.start = function () {
            stage.enableDOMEvents(true);
            this._bg = new createjs.Bitmap(assets.getResult("Space_BG"));
            this._bg2 = new createjs.Sprite(background_anim, "idle");
            this.addChild(this._bg);
            this._ship = new objects.Player(player_anim);
            this.addChild(this._ship);
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
            var _loop_1 = function (i) {
                this_1.enemies.forEach(function (enemy) {
                    collision.check(i, enemy);
                });
            };
            var this_1 = this;
            // Check collisions
            for (var _i = 0, _a = this._ship.getShots; _i < _a.length; _i++) {
                var i = _a[_i];
                _loop_1(i);
            }
            this._ship.update();
            this.enemies.forEach(function (enemy) {
                //terrible soultion for terrible language     
                enemy.update();
            });
            this._timer += createjs.Ticker.interval;
            if (this._timer > 1000)
                this.enemySpawn();
        };
        return Shooter;
    }(objects.Scene));
    scenes.Shooter = Shooter;
})(scenes || (scenes = {}));
//# sourceMappingURL=shooter.js.map