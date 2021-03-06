var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Laser = (function (_super) {
        __extends(Laser, _super);
        function Laser() {
            _super.call(this, null, "bullet", "bullet", 18, 1);
            this._speed = 25;
        }
        Laser.prototype.start = function () {
            mana -= 0.4;
        };
        Laser.prototype.handleComplete = function () {
            //Tween complete
        };
        Laser.prototype.update = function () {
            _super.prototype.update.call(this);
            if (gamelost)
                return;
            this.position.x += this._scaleX * this._speed;
            this.position.y += this._scaleY * this._speed;
        };
        Laser.prototype.setPosition = function (newPosition) {
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
            var MX = stage.mouseX + 50 * (0.5 - Math.random());
            var MY = stage.mouseY + 50 * (0.5 - Math.random());
            ;
            this._scaleY = ((MY - this.position.y) /
                (Math.abs((MY - this.position.y)) + Math.abs((MX - this.position.x))));
            this._scaleX = ((MX - this.position.x) /
                (Math.abs((MY - this.position.y)) + Math.abs((MX - this.position.x))));
            //console.log("player pos " +this.position.x+" : "+this.position.y);
            //console.log("mouse pos " +stage.mouseX+" : "+stage.mouseY);         
            //console.log("laser scales " +this._scaleX+" : "+this._scaleY);        
            var newRotation = Math.atan2(stage.mouseY - this.position.y, stage.mouseX - this.position.x) * 180 / Math.PI;
            this.rotation = newRotation;
        };
        return Laser;
    }(objects.GameObject));
    objects.Laser = Laser;
})(objects || (objects = {}));
//# sourceMappingURL=laser.js.map