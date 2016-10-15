/// <reference path = "_reference.ts" />
// Global Variables
var assets;
var canvas;
var stage;
var spriteSheetLoader;
var shipAtlas;
var currentScene;
var scene;
var collision;
// Preload Assets required
var assetData = [
    { id: "Space_BG", src: "../../Assets/images/bg.png" },
    { id: "Menu_BG", src: "../../Assets/images/menuBG.png" },
    { id: "PlayBtn", src: "../../Assets/images/playBtn.png" },
    { id: "Laser", src: "../../Assets/images/laser.png" },
    { id: "Player", src: "../../Assets/images/shipAtlas.png" }
];
function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);
    collision = new managers.Collision();
    var atlasData = {
        "images": [
            assets.getResult("Player")
        ],
        "frames": [
            [1, 1, 180, 180, 0, 0, 0],
            [183, 1, 176, 175, 0, 0, 0],
            [361, 1, 172, 163, 0, 0, 0],
            [535, 1, 166, 154, 0, 0, 0],
            [703, 1, 157, 154, 0, 0, 0],
            [862, 1, 122, 112, 0, 0, 0],
            [862, 115, 129, 111, 0, 0, 0],
            [535, 157, 69, 71, 0, 0, 0],
            [361, 166, 50, 6, 0, 0, -17],
            [413, 166, 42, 43, 0, 0, 0],
            [361, 174, 42, 33, 0, 0, 0],
            [457, 166, 42, 22, 0, 0, 0]
        ],
        "animations": {
            "explode": {
                "frames": [7, 6, 3, 0, 1, 2, 4], "speed": 0.1, next: false
            },
            "enemy": { "frames": [5] },
            "laser": { "frames": [8] },
            "ship": { "frames": [9] },
            "ship_L1": { "frames": [10] },
            "ship_L2": { "frames": [11] }
        }
    };
    shipAtlas = new createjs.SpriteSheet(atlasData);
    scene = config.Scene.MENU;
    changeScene();
}
function gameLoop(event) {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}
function changeScene() {
    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();
            ;
            console.log("Starting MENU scene");
            break;
        case config.Scene.SHOOTER:
            stage.removeAllChildren();
            currentScene = new scenes.Shooter();
            console.log("Starting SHOOTER scene");
            break;
    }
}
//# sourceMappingURL=game.js.map