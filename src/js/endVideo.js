import Phaser from "phaser";

var videoCredits;

export default class endVideo extends Phaser.Scene {
  constructor() {
    super({ key: "endVideo" });
  }

  preload() {
    this.load.video("end", "https://www.youtube.com/watch?v=ZIrA3L71xg4");

    this.load.video(
      "end",
      "src/assets/LostSoul.mp4",
      "loadeddata",
      false,
      true
    );
  }

  create() {
    var vid = this.add.video(400, 300, "end");

    vid.play(true);
    vid.setPaused(false);
  }
}
