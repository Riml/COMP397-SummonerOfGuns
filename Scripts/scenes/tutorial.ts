/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Tutorial extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _backBtn : objects.Button;
        //private _tutorialBtn : objects.Button;
        private _menuBG : createjs.Bitmap;
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            console.log("Menu Scene Started");
            gamelost=false;

            this._backBtn = new objects.Button("BackBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y - 150);
            this._backBtn.on("click", this._backBtnClick, this);
            this.addChild(this._backBtn);




            this._menuBG = new createjs.Bitmap(assets.getResult("Tut_BG"));
            this.addChild(this._menuBG);

           

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update() : void {

        }

       
        private _backBtnClick(event : createjs.MouseEvent) {
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}