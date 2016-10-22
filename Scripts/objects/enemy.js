var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(animation) {
            _super.call(this, animation, "enemy");
            this.name = "enemy";
            this.position = new objects.Vector2(-90, config.Screen.CENTER_Y + (Math.random() - 0.5) * 400);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this._speed = -0.5 - curretWave * Math.random();
        }
        Enemy.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!gamelost)
                this.position.x -= this._speed;
            if (this.position.x > config.Screen.WIDTH && this.dead == false) {
                gamelost = true;
            }
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map