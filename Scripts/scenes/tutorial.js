/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Tutorial = (function (_super) {
        __extends(Tutorial, _super);
        // Menu Class Contructor
        function Tutorial() {
            _super.call(this);
        }
        Tutorial.prototype.start = function () {
            console.log("Menu Scene Started");
            gamelost = false;
            this._backBtn = new objects.Button("BackBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y - 150);
            this._backBtn.on("click", this._backBtnClick, this);
            this.addChild(this._backBtn);
            this._menuBG = new createjs.Bitmap(assets.getResult("Tut_BG"));
            this.addChild(this._menuBG);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        Tutorial.prototype.update = function () {
        };
        Tutorial.prototype._backBtnClick = function (event) {
            scene = config.Scene.MENU;
            changeScene();
        };
        return Tutorial;
    }(objects.Scene));
    scenes.Tutorial = Tutorial;
})(scenes || (scenes = {}));
//# sourceMappingURL=tutorial.js.map