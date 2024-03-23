//imports
import Phaser from "phaser";
//variables
var player;
var keyboard;
var playButton;
var playButton2;
var buttonMouvement;
var launch = false;
var life = 3;
var deadSoul;
var musique;
var die;
var bossMusic;

export default class menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }
  preload() {
    this.load.audio("die", "src/assets/Sound_effect/décès.mp3");
    //map1
    // load tileset
    this.load.image("level1Tiles", "src/assets/map1/tileset.png");
    // Load background image
    this.load.image("backgroundImage", "src/assets/map1/map1.png");
    //map2
    this.load.image("level2Tiles", "src/assets/map2/tileset2.png");
    // Load background image
    this.load.image("backgroundImage2", "src/assets/map2/map2.png");
    // load tileset map and properties
    this.load.image("level3Tiles", "src/assets/map3/tileset3.png");
    // Load background image
    this.load.image("backgroundImage3", "src/assets/map3/map3.png");
    // load tileset map and properties
    this.load.tilemapTiledJSON("levelMap", "src/assets/map1/map1_1.json");
    this.load.tilemapTiledJSON("levelMap2", "src/assets/map2/map2_1.json");
    this.load.tilemapTiledJSON("levelMap3", "src/assets/map3/map3_1.json");
    //Menu buttons
    this.load.image("PlayButton1", "src/assets/PlayButton1.png");
    this.load.image("PlayButton2", "src/assets/PlayButton2.png");
    //background
    this.load.image("Back", "src/assets/menu.png");
    this.load.spritesheet("roche", "src/assets/fallingRocks.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    //player
    this.load.spritesheet("player", "src/assets/player.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    //enemy
    this.load.spritesheet("cible", "src/assets/enemy.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    //DeadSoul

    this.load.spritesheet("deadSoul", "src/assets/DeadSoul.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    //boss
    this.load.spritesheet("hecter", "src/assets/hecter.png", {
      frameWidth: 192,
      frameHeight: 256,
    });
    this.load.spritesheet("baba", "src/assets/baba.png", {
      frameWidth: 192,
      frameHeight: 256,
    });
    this.load.spritesheet("doyle", "src/assets/doyle.png", {
      frameWidth: 192,
      frameHeight: 256,
    });
    this.load.spritesheet("doyleHand", "src/assets/doyleHand.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("bullet", "assets/soulieFlame.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("rocks", "src/assets/fallingRocks.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.audio("musique", "src/assets/OST/Menu.mp3");
  }
  create() {
    musique = this.sound.add("musique", { volume: 0.2 });
    musique.play();

    this.add.image(450, 300, "Back");
    //button 2
    playButton2 = this.physics.add.sprite(450, 460, "PlayButton2").setDepth(1);
    playButton2.body.allowGravity = false;
    playButton2.body.immovable = true;
    playButton2.setScale(0.4);
    playButton2.setInteractive();
    //button 1
    playButton = this.physics.add.sprite(450, 460, "PlayButton1").setDepth(1);
    playButton.body.allowGravity = false;
    playButton.body.immovable = true;
    playButton.setScale(0.4);
    playButton.setInteractive();
    playButton.on("pointerup", () => {
      playButton.destroy();

      buttonMouvement.resume();
      //this.scene.start("level1");
    });
    buttonMouvement = this.tweens.add({
      targets: [playButton2],
      paused: true,
      ease: "Linear",
      duration: 1000,
      yoyo: false,
      y: "+=300",
      delay: 0,
      hold: 1000,
      repeatDelay: 1000,
      onComplete: function () {
        launch = true;
      },
    });
  }
  update() {
    if (launch === true) {
      this.scene.start("level1");
      musique.stop();
    }
  }
}
