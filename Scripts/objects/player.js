var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(animation) {
            _super.call(this, animation, "player");
            this._timeBetweenShots = 1;
            this._timer = 0;
            this._shots = [];
            //this.start();
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            var myPlayer = this;
            stage.on("stagemousedown", function (event) {
                console.log("mana : " + mana);
                //console.log("_casting 1 : " +this._casting);
                if (!this._casting || mana > 10) {
                    this._casting = true;
                    mana -= 10;
                    myPlayer.gotoAndPlay("cast");
                }
                //console.log(player_anim.getNumFrames("cast") - 1);
            });
        }
        Object.defineProperty(Player.prototype, "getShots", {
            get: function () {
                return this._shots;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.update = function () {
            var newRotation = Math.atan2(stage.mouseY - this.position.y, stage.mouseX - this.position.x) * 180 / Math.PI;
            this.rotation = newRotation;
            //console.log("_casting 5 : " +this._casting);
            _super.prototype.update.call(this);
            this._timer += createjs.Ticker.interval;
            if (controls.UP) {
                this.moveUp();
            }
            if (controls.DOWN) {
                this.moveDown();
            }
            if (controls.RIGHT) {
                this.moveRight();
            }
            if (controls.LEFT) {
                this.moveLeft();
            }
            if (controls.SHOOT) {
                this.gotoAndPlay("cast");
            }
            for (var _i = 0, _a = this._shots; _i < _a.length; _i++) {
                var laser = _a[_i];
                laser.update();
            }
            //console.log(this.currentAnimationFrame);
            if (this.currentAnimationFrame > player_anim.getNumFrames("cast") - 2) {
                this._casting = false;
                this._shoot();
            }
            //console.log(this._timer);
        };
        Player.prototype._shoot = function () {
            this._casting = false;
            if (this._timer > 100.0) {
                var newLaser = new objects.Laser();
                newLaser.setPosition(new objects.Vector2(this.position.x + 25, this.position.y - 18));
                currentScene.addChild(newLaser);
                this._shots.push(newLaser);
                this._timer = 0.0;
            }
        };
        Player.prototype._onKeyDown = function (event) {
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
        Player.prototype._onKeyUp = function (event) {
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
        Player.prototype.moveUp = function () {
            this.position.y -= 5;
        };
        Player.prototype.moveDown = function () {
            this.position.y += 5;
        };
        Player.prototype.moveLeft = function () {
            this.position.x -= 5;
        };
        Player.prototype.moveRight = function () {
            this.position.x += 5;
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map