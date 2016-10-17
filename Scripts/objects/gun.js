var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Gun = (function (_super) {
        __extends(Gun, _super);
        function Gun(animation, gunName) {
            _super.call(this, animation, gunName);
            this._timeBetweenShots = 1;
            this._timer = 0;
            this.shooting = false;
            this._shots = [];
            //this.start();
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            var currentGun = this;
            //playerCasting=false;
            stage.on("stagemousedown", function (event) {
                if (currentGun.shooting)
                    return;
                currentGun.gotoAndPlay("start");
                currentGun.shooting = true;
            });
            stage.on("stagemouseup", function (event) {
                if (!currentGun.shooting)
                    return;
                currentGun.gotoAndPlay("idle");
                currentGun.shooting = false;
            });
        }
        Object.defineProperty(Gun.prototype, "getShots", {
            get: function () {
                return this._shots;
            },
            enumerable: true,
            configurable: true
        });
        Gun.prototype.update = function () {
            var newRotation = Math.atan2(stage.mouseY - this.position.y, stage.mouseX - this.position.x) * 180 / Math.PI;
            this.rotation = newRotation;
            _super.prototype.update.call(this);
            this._timer += createjs.Ticker.interval;
            for (var _i = 0, _a = this._shots; _i < _a.length; _i++) {
                var bullet = _a[_i];
                bullet.update();
            }
            if (this.currentAnimation == "shot") {
                this._shoot();
            }
            //console.log(this._timer);
        };
        Gun.prototype._shoot = function () {
            if (this._timer > 50.0) {
                var newBullet = new objects.Laser();
                newBullet.setPosition(new objects.Vector2(this.position.x + 5 * (0.5 - Math.random()), this.position.y - 10 + 5 * (0.5 - Math.random())));
                currentScene.addChild(newBullet);
                this._shots.push(newBullet);
                this._timer = 0.0;
            }
        };
        Gun.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
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
        };
        Gun.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
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
        };
        Gun.prototype.moveUp = function () {
            this.position.y -= 5;
        };
        Gun.prototype.moveDown = function () {
            this.position.y += 5;
        };
        Gun.prototype.moveLeft = function () {
            this.position.x -= 5;
        };
        Gun.prototype.moveRight = function () {
            this.position.x += 5;
        };
        return Gun;
    }(objects.GameObject));
    objects.Gun = Gun;
})(objects || (objects = {}));
//# sourceMappingURL=gun.js.map