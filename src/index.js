//Imports
import Phaser from "phaser";
import "./styles.css";
import menu from "/src/js/menu.js";
import level1 from "/src/js/level1.js";
import level2 from "/src/js/level2.js";
import level3 from "/src/js/level3.js";
import endVideo from "/src/js/endVideo.js";
// config
var config = {
  type: Phaser.AUTO,
  /* width: 1280,
  height: 720, */
  width: 900,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: false,
    },
  },
  scene: [menu, level1, level2, level3, endVideo],
};
var game = new Phaser.Game(config);
game.scene.start("menu");
