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
            this._mg_summoned = false;
            this._activeGuns = [];
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            var myPlayer = this;
            playerCasting = false;
            this.position = new objects.Vector2(900, 524);
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
        Player.prototype.update = function () {
            _super.prototype.update.call(this);
            for (var _i = 0, _a = this._activeGuns; _i < _a.length; _i++) {
                var gun = _a[_i];
                gun.update();
            }
            this._timer += createjs.Ticker.interval;
            if (controls.RIGHT) {
                this.moveRight();
            }
            if (controls.LEFT) {
                this.moveLeft();
            }
            if (controls.N1) {
                if (mana > 50) {
                    mana -= 50;
                    this.gotoAndPlay("cast");
                }
            }
            if (this.currentAnimationFrame > player_anim.getNumFrames("cast") - 2 && this._mg_summoned == false) {
                playerCasting = false;
                this._mg_summoned = true;
                this._summon();
            }
        };
        Object.defineProperty(Player.prototype, "getActiveGuns", {
            get: function () {
                return this._activeGuns;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype._summon = function () {
            var newMinigun = new objects.Gun(minigun_anim, "minigun");
            newMinigun.position = new objects.Vector2(this.x - 20, this.y - 40);
            this._activeGuns.push(newMinigun);
            currentScene.addChild(newMinigun);
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
                case keys.N1:
                    console.log("1 key pressed");
                    controls.N1 = true;
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
                case keys.N1:
                    controls.N1 = false;
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