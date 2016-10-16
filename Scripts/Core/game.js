/// <reference path = "_reference.ts" />
// Global Variables
var assets;
var canvas;
var stage;
var spriteSheetLoader;
var player_anim;
var enemy_anim;
var background_anim;
var minigun_anim;
//var shipAtlas : createjs.SpriteSheet;
var score = 0;
var mana = 100;
var currentScene;
var scene;
var collision;
// Preload Assets required
var assetData = [
    //{id: "Space_BG", src:"../../Assets/images/bg.png"},
    { id: "Menu_BG", src: "../../Assets/images/menuBG.png" },
    { id: "PlayBtn", src: "../../Assets/images/playBtn.png" },
    //{id: "Laser", src:"../../Assets/images/laser.png"},
    //{id: "Player", src:"../../Assets/images/shipAtlas.png"}
    { id: "bg_ss", src: "../../Assets/images/background_ss.png" },
    { id: "bg_bt", src: "../../Assets/images/bottom_background.png" },
    { id: "enemy_ss", src: "../../Assets/images/enemy1_ss.png" },
    { id: "bullet", src: "../../Assets/images/bullet.png" },
    { id: "minigun_shot_ss", src: "../../Assets/images/minigun_shot.png" },
    { id: "player_ss", src: "../../Assets/images/mage1_ss.png" },
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
    var newData = {
        "images": [assets.getResult("player_ss")],
        "frames": { width: 50, height: 42 },
        "animations": {
            "idle": [0, 1, "idle", 0.05],
            "cast": [0, 11, "idle", 0.1]
        }
    };
    player_anim = new createjs.SpriteSheet(newData);
    var newData2 = {
        "images": [assets.getResult("bg_ss")],
        "frames": { width: 1000, height: 524 },
        "animations": {
            "idle": [0, 7, "idle", 0.1]
        }
    };
    background_anim = new createjs.SpriteSheet(newData2);
    var newData3 = {
        "images": [assets.getResult("enemy_ss")],
        "frames": { width: 64, height: 135 },
        "animations": {
            "idle": { "frames": [0, 1, 2, 3], "speed": 0.3, next: true }
        }
    };
    enemy_anim = new createjs.SpriteSheet(newData3);
    var newData4 = {
        "images": [assets.getResult("minigun_shot_ss")],
        "frames": { width: 90, height: 23 },
        "animations": {
            "idle": { "frames": [0, 1], "speed": 0.1, next: true }
        }
    };
    minigun_anim = new createjs.SpriteSheet(newData4);
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