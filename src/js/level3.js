import Phaser from "phaser";
var doyle;
var keyboard;
var player;
var z;
var q;
var d;
var space;
var doubleJump = true;
var groupeBullets;
var shoot;
var startBossSequence;
var death;
var resume = false;
var doyleAlive = true;
var doyleHealth = 60;
var soulieHealth = 3;
var deadSoul;
var moves;
var enemymove;
var cible;
var musique3;
var space;
var doyleRightHand;
var doyleLeftHand;
var doyleHand_mouvementUp;
var doyleHand_mouvementDown;
var doyleHand_mouvementLeft;
var doyleHand_mouvementLeft2;
var doyleHand_mouvementReset;
var delay;
var die;
var bossMusic;
var bossNoise3;
var Shot;

export default class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });
  }

  preload() {
    this.load.audio("musique3", "src/assets/OST/Map3.mp3");
    this.load.image("bullet", "src/assets/soulie-flame-2.png");
    this.load.image("cible", "src/assets/enemy-cycle-2.png");
    this.load.audio("die", "src/assets/Sound_effect/décès.mp3");
    this.load.audio("boss", "src/assets/OST/Boss.mp3");
    this.load.audio("noise3", "src/assets/Sound_effect/doyle.mp3");
    this.load.audio("bang", "src/assets/Sound_effect/Fireball.mp3");
  }

  create() {
    delay = true;
    musique3 = this.sound.add("musique3", { volume: 0.2 });
    die = this.sound.add("die", { volume: 0.5 });
    bossMusic = this.sound.add("boss", { volume: 0.2 });
    bossNoise3 = this.sound.add("noise3", { volume: 0.6 });
    Shot = this.sound.add("bang", { volume: 0.5 });
    musique3.play();
    moves = true;
    startBossSequence = 0;
    // insert background image
    this.add.image(450, 1760, "backgroundImage3").setScale(1.1);

    const levelMap3 = this.add.tilemap("levelMap3");

    const tileset3 = levelMap3.addTilesetImage("tileset3", "level3Tiles");
    // backtiles
    const Backtiles = levelMap3.createLayer("Backtiles", tileset3);
    // inanimate
    const Inanimate = levelMap3.createLayer("Inanimate", tileset3);
    // platforms
    const Platform = levelMap3.createLayer("Platform", tileset3);
    Platform.setCollisionByProperty({ isSolid: true });

    player = this.physics.add.sprite(400, 3450, "player");
    player.setCollideWorldBounds(true);

    //Doyle

    doyle = this.physics.add.sprite(1000, 218, "doyle").setDepth(1);
    doyle.setCollideWorldBounds(true);
    doyle.body.allowGravity = false;
    //doyle Hand
    doyleLeftHand = this.physics.add.sprite(735, 232, "doyleHand").setDepth(3);
    doyleRightHand = this.physics.add.sprite(668, 255, "doyleHand").setDepth(1);

    doyleLeftHand.body.allowGravity = false;
    doyleLeftHand.body.immovable = true;
    doyleRightHand.body.allowGravity = false;
    doyleRightHand.body.immovable = true;

    this.physics.add.collider(player, Platform);
    this.physics.add.collider(doyle, Platform);

    groupeBullets = this.physics.add.group();
    this.physics.add.overlap(groupeBullets, doyle, hit, null, this);

    //animations creation
    //player animations
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 0 }],
      frameRate: 2,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "player", frame: 5 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "fall",
      frames: [{ key: "player", frame: 6 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "shoot",
      frames: [{ key: "player", frame: 7 }],
      frameRate: 200,
      repeat: -1,
    });
    //Soul Animation
    this.anims.create({
      key: "Soul",
      frames: this.anims.generateFrameNumbers("deadSoul", { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });

    //Keyboard
    keyboard = this.input.keyboard.createCursorKeys();
    z = this.input.keyboard.addKey("z");
    q = this.input.keyboard.addKey("q");
    d = this.input.keyboard.addKey("d");
    shoot = this.input.keyboard.addKey("a");
    space = this.input.keyboard.addKey("space");

    this.physics.world.setBounds(0, 0, 800, 3520);
    this.cameras.main.setBounds(0, 0, 800, 3520);
    this.cameras.main.startFollow(player);
    /* this.cameras.main.setZoom(1.5); */

    this.physics.add.overlap(player, doyle, bossHit, null, this);
    this.physics.add.overlap(player, doyleRightHand, bossHit, null, this);

    this.physics.add.collider(player, Platform);

    this.anims.create({
      key: "staticDoyle",
      frames: this.anims.generateFrameNumbers("doyle", { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "doyleRightHand",
      frames: [{ key: "doyleHand", frame: 2 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "doyleHand3",
      frames: [{ key: "doyleHand", frame: 3 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "doyleHand4",
      frames: [{ key: "doyleHand", frame: 4 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "doyleLeftHand",
      frames: [{ key: "doyleHand", frame: 0 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "doyleLeftAttack",
      frames: [{ key: "doyleHand", frame: 1 }],
      frameRate: 10,
      repeat: -1,
    });

    this.physics.world.on("worldbounds", function (body) {
      var objet = body.gameObject;
      if (groupeBullets.contains(objet)) {
        objet.destroy();
      }
    });
    doyleLeftHand.anims.play("doyleLeftHand", true);
  }

  update() {
    //-----------------------------------------------
    //Boss Sequence
    if (player.y < 384 && startBossSequence === 0) {
      startBossSequence = 1;
      bossMusic.play();
      bossNoise3.play();
      musique3.stop();
    }
    if (startBossSequence === 1) {
      startBossSequence = 2;
      //start animation
    }
    //Boss mouvement
    if (player.y > 3487) {
      moves = false;
      this.physics.pause();
      player.setPosition(player.x, 3486);
      deadSoul = this.physics.add.sprite(player.x, player.y, "deadSoul");
      deadSoul.anims.play("Soul", true);
      player.destroy();
      die.play();
      bossMusic.stop();
      musique3.stop();
      death.resume();
    }
    death = this.tweens.add({
      targets: [player],
      paused: true,
      eases: "Linear",
      duration: 500,
      yoyo: false,
      delay: 3000,
      onComplete: function () {
        resume = true;
      },
    });
    if (resume === true) {
      this.events.off();
      resume = false;
      this.scene.restart();
    }
    //player moves
    if (moves === true) {
      if (keyboard.left.isDown || q.isDown) {
        player.direction = "left";
        player.setVelocityX(-160);
        player.anims.play("left", true);
        player.flipX = true;
      } else if (keyboard.right.isDown || d.isDown) {
        player.direction = "right";
        player.setVelocityX(160);
        player.anims.play("right", true);
        player.flipX = false;
      } else {
        player.setVelocityX(0);
        player.anims.play("turn");
      }
      if (player.body.blocked.down) {
        doubleJump = true;
      }
      if (keyboard.up.isDown || z.isDown || space.isDown) {
        if (player.body.blocked.down) {
          player.setVelocityY(-430);
        } else {
          if (doubleJump === true && player.body.velocity.y > 100) {
            player.setVelocityY(-430);
            doubleJump = false;
          }
        }
      }
      if (player.body.velocity.y < -50) {
        player.anims.play("jump", true);
      } else if (player.body.velocity.y > 100) {
        player.anims.play("fall", true);
      }
      if (Phaser.Input.Keyboard.JustDown(shoot)) {
        tirer(player);
        Shot.play();
        player.anims.play("shoot", true);
        player.tire = true;
        var monTimer = this.time.addEvent({
          delay: 500,
          callback: function () {
            player.tire = false;
          },
          callbackScope: this,
        });
      }
    }

    //ajout

    doyle.anims.play("staticDoyle", true);
    if (startBossSequence === 2) {
      if (player.x > 500 && delay === true) {
        delay = false;
        doyleRightHand.anims.play("doyleHand3", true);
        doyleLeftHand.anims.play("doyleLeftAttack", true);
        doyleHand_mouvementLeft2.resume();
      } else if (delay === true) {
        delay = false;
        doyleHand_mouvementUp.resume();
      }
    }

    //doyle mouvement
    doyleHand_mouvementUp = this.tweens.add({
      targets: [doyleRightHand],
      paused: true,
      ease: "Linear",
      duration: 500,
      yoyo: false,
      y: "-=200",
      delay: 0,
      hold: 100,
      repeatDelay: 1,
      onComplete: function () {
        doyleRightHand.anims.play("doyleHand3", true);
        doyleHand_mouvementLeft.resume();
      },
    });
    doyleHand_mouvementLeft = this.tweens.add({
      targets: [doyleRightHand],
      paused: true,
      ease: "Linear",
      duration: 500,
      yoyo: false,
      x: player.x,
      delay: 0,
      hold: 1000,
      repeatDelay: 1,
      onComplete: function () {
        doyleRightHand.anims.play("doyleHand4", true);
        doyleHand_mouvementDown.resume();
      },
    });
    doyleHand_mouvementDown = this.tweens.add({
      targets: [doyleRightHand],
      paused: true,
      ease: "Linear",
      duration: 200,
      yoyo: false,
      y: "+=200",
      delay: 0,
      hold: 1600,
      repeatDelay: 1000,
      onComplete: function () {
        doyleRightHand.anims.play("doyleRightHand", true);
        doyleHand_mouvementReset.resume();
      },
    });
    doyleHand_mouvementReset = this.tweens.add({
      targets: [doyleRightHand],
      paused: true,
      ease: "Linear",
      duration: 500,
      yoyo: false,
      x: "668",
      y: "255",
      delay: 0,
      hold: 600,
      repeatDelay: 1000,
      onComplete: function () {
        delay = true;
      },
    });
    //Hand mouvement 2
    doyleHand_mouvementLeft2 = this.tweens.add({
      targets: [doyleRightHand],
      paused: true,
      ease: "Linear",
      duration: 500,
      yoyo: false,
      x: 500,
      delay: 1000,
      hold: 500,
      repeatDelay: 1,
      onComplete: function () {
        doyleRightHand.anims.play("doyleRightHand", true);
        doyleLeftHand.anims.play("doyleLeftHand", true);
        doyleHand_mouvementReset.resume();
      },
    });
  }
}

function tirer(player) {
  var coefDir;
  if (player.direction === "left") {
    coefDir = -1;
  } else {
    coefDir = 1;
  }
  var bullet = groupeBullets.create(
    player.x + 25 * coefDir,
    player.y - 4,
    "bullet"
  );
  bullet.setCollideWorldBounds(true);
  bullet.body.onWorldBounds = true;
  bullet.body.allowGravity = false;
  bullet.setVelocity(500 * coefDir, 0);
}

function enemyHit(bullet, cible) {
  cible.pointsVie--;
  if (cible.pointsVie === 0) {
    cible.destroy();
    bossMusic.stop();
  }
  bullet.destroy();
}

function hit(baba, bullet) {
  doyleHealth--;
  if (doyleHealth <= 0) {
    doyle.disableBody(true, true);
    bossMusic.stop();
    openExternalLink();
    this.scene.start("menu");
  }
  bullet.destroy();
}
function bossHit(player, baba) {
  moves = false;
  this.physics.pause();
  deadSoul = this.physics.add.sprite(player.x, player.y, "deadSoul");
  deadSoul.anims.play("Soul", true);
  player.destroy();
  death.resume();
  bossMusic.stop();
  die.play();
}

function cibleHit(cible, player) {
  moves = false;
  this.physics.pause();
  deadSoul = this.physics.add.sprite(player.x, player.y, "deadSoul");
  deadSoul.anims.play("Soul", true);
  player.destroy();
  death.resume();
  bossMusic.stop();
  die.play();
}

function damageTaken() {
  soulieHealth--;
  if (soulieHealth === 0) {
    death.resume();
  }
}

function openExternalLink() {
  var url = "https://youtu.be/qmjoQAhlZBI";

  var s = window.open(url);

  if (s && s.focus) {
    s.focus();
  } else if (!s) {
    window.location.href = url;
    this.scene.start("menu");
  }
}
