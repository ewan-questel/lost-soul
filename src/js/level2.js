import Phaser from "phaser";
var hecter;
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
var hecterAlive = true;
var hecterHealth = 55;
var soulieHealth = 3;
var deadSoul;
var moves;
var enemymove;
var cible;
var musique2;
var die;
var bossMusic;
var bossNoise2;
var hecterAttack;
var groupeRoche1;
var groupeRoche2;

var rocksFall1_1;
var rocksFall1_2;
var rocksFall1_3;
var rocksFall2_1;
var rocksFall2_2;
var rocksFall2_3;
var roche1;
var roche2;
var roche3;
var roche4;
var roche5;
var roche6;
var Shot;

export default class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });
  }

  preload() {
    this.load.audio("musique2", "src/assets/OST/Map2.mp3");
    this.load.image("bullet", "src/assets/soulie-flame-2.png");
    this.load.image("cible", "src/assets/enemy-cycle-2.png");
    this.load.audio("die", "src/assets/Sound_effect/décès.mp3");
    this.load.audio("boss", "src/assets/OST/Boss.mp3");
    this.load.audio("noise2", "src/assets/Sound_effect/Hecter_wet.mp3");
    this.load.audio("bang", "src/assets/Sound_effect/Fireball.mp3");
  }

  create() {
    musique2 = this.sound.add("musique2", { volume: 0.2 });
    musique2.play();
    die = this.sound.add("die", { volume: 0.5 });
    bossMusic = this.sound.add("boss", { volume: 0.2 });
    bossNoise2 = this.sound.add("noise2", { volume: 0.6 });
    Shot = this.sound.add("bang", { volume: 0.5 });
    moves = true;
    startBossSequence = 0;
    // insert background image
    this.add.image(3200, 300, "backgroundImage2");

    const levelMap2 = this.add.tilemap("levelMap2");

    const tileset2 = levelMap2.addTilesetImage("tiles", "level2Tiles");

    const Platform = levelMap2.createLayer("Plateform", tileset2);
    Platform.setCollisionByProperty({ isSolid: true });
    const Decoration = levelMap2.createLayer("Decoration", tileset2);

    player = this.physics.add.sprite(200, 200, "player");
    player.setCollideWorldBounds(true);

    // hecter

    hecter = this.physics.add.sprite(7000, 250, "hecter").setDepth(1);
    hecter.setCollideWorldBounds(true);
    hecter.body.allowGravity = false;

    this.physics.add.collider(player, Platform);
    this.physics.add.collider(hecter, Platform);

    groupeBullets = this.physics.add.group();
    this.physics.add.overlap(groupeBullets, hecter, hit, null, this);
    //roche

    roche1 = this.physics.add.sprite(5750, -50, "roche");
    roche1.body.allowGravity = false;
    roche1.body.immovable = true;
    roche3 = this.physics.add.sprite(5874, -50, "roche");
    roche3.body.allowGravity = false;
    roche3.body.immovable = true;
    roche5 = this.physics.add.sprite(5998, -50, "roche");
    roche5.body.allowGravity = false;
    roche5.body.immovable = true;
    roche2 = this.physics.add.sprite(5812, -50, "roche");
    roche2.body.allowGravity = false;
    roche2.body.immovable = true;
    roche4 = this.physics.add.sprite(5936, -50, "roche");
    roche4.body.allowGravity = false;
    roche4.body.immovable = true;
    roche6 = this.physics.add.sprite(6060, -50, "roche");
    roche6.body.allowGravity = false;
    roche6.body.immovable = true;

    this.physics.add.collider(player, roche1, bossHit, null, this);
    this.physics.add.collider(player, roche2, bossHit, null, this);
    this.physics.add.collider(player, roche3, bossHit, null, this);
    this.physics.add.collider(player, roche4, bossHit, null, this);
    this.physics.add.collider(player, roche5, bossHit, null, this);
    this.physics.add.collider(player, roche6, bossHit, null, this);

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
    //Falling rock
    this.anims.create({
      key: "fallingRock",
      frames: [{ key: "rocks", frame: 0 }],
      frameRate: 200,
      repeat: -1,
    });
    this.anims.create({
      key: "breakingRock",
      frames: [{ key: "rocks", frame: 1 }],
      frameRate: 6,
      repeat: 1,
    });
    this.anims.create({
      key: "brokenRock",
      frames: [{ key: "rocks", frame: 2 }],
      frameRate: 6,
      repeat: 1,
    });
    this.anims.create({
      key: "enemyMoves",
      frames: this.anims.generateFrameNumbers("cible", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    //Keyboard
    keyboard = this.input.keyboard.createCursorKeys();
    z = this.input.keyboard.addKey("z");
    q = this.input.keyboard.addKey("q");
    d = this.input.keyboard.addKey("d");
    shoot = this.input.keyboard.addKey("a");
    space = this.input.keyboard.addKey("space");

    this.physics.world.setBounds(0, 0, 6200, 600);
    this.cameras.main.setBounds(0, 0, 6200, 600);
    this.cameras.main.startFollow(player);
    /* this.cameras.main.setZoom(1.5); */

    this.anims.create({
      key: "staticHecter",
      frames: this.anims.generateFrameNumbers("hecter", { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "attackHecter",
      frames: [{ key: "hecter", frame: 2 }],
      frameRate: 2,
    });

    this.physics.add.overlap(player, hecter, bossHit, null, this);

    this.physics.add.collider(player, Platform);

    cible = this.physics.add.group();
    var e1 = cible.create(980, 127, "cible");
    var e2 = cible.create(1050, 288, "cible");
    var e3 = cible.create(1000, 416, "cible");
    var e4 = cible.create(3350, 288, "cible");
    var e5 = cible.create(4500, 320, "cible");

    this.physics.add.collider(cible, Platform);
    this.physics.add.overlap(player, cible, cibleHit, null, this);
    this.physics.add.overlap(groupeBullets, cible, enemyHit, null, this);
    cible.children.iterate(function (cibleTrouvee) {
      cibleTrouvee.pointsVie = 3;
      cibleTrouvee.setBounce(0);
    });

    this.physics.world.on("worldbounds", function (body) {
      var objet = body.gameObject;
      if (groupeBullets.contains(objet)) {
        objet.destroy();
      }
    });

    enemymove = this.tweens.add({
      targets: cible.getChildren(),
      ease: "Linear",
      duration: 3000,
      yoyo: true,
      x: "+=100",
      delay: 0,
      hold: 0,
      repeatDelay: 0,
      repeat: -1,
    });
    e1.anims.play("enemyMoves", true);
    e2.anims.play("enemyMoves", true);
    e3.anims.play("enemyMoves", true);
    e4.anims.play("enemyMoves", true);
    e5.anims.play("enemyMoves", true);
    rocksFall1_1 = this.tweens.add({
      targets: [roche1, roche3, roche5],
      paused: true,
      ease: "Sine.easeIn",
      duration: 500,
      yoyo: false,
      y: 50,
      delay: 0,
      hold: 800,
      onComplete: function () {
        rocksFall1_2.resume();
        hecter.anims.play("staticHecter", true);
      },
    });
    rocksFall1_2 = this.tweens.add({
      targets: [roche1, roche3, roche5],
      paused: true,
      ease: "Sine.easeIn",
      duration: 500,
      yoyo: false,
      y: 352,
      delay: 0,
      hold: 0,
      onComplete: function () {
        roche1.anims.play("breakingRock", true);
        roche3.anims.play("breakingRock", true);
        roche5.anims.play("breakingRock", true);
        rocksFall1_3.resume();
      },
    });
    rocksFall1_3 = this.tweens.add({
      targets: [roche1, roche3, roche5],
      paused: true,
      ease: "Sine.easeIn",
      duration: 500,
      yoyo: false,
      y: "+=1",
      delay: 0,
      hold: 1500,
      onComplete: function () {
        hecter.anims.play("attackHecter", true);
        roche2.anims.play("fallingRocks", true);
        roche2.body.enable = true;
        roche4.anims.play("fallingRocks", true);
        roche4.body.enable = true;
        roche1.anims.play("brokenRock", true);
        roche1.body.enable = false;
        roche3.anims.play("brokenRock", true);
        roche3.body.enable = false;
        roche5.anims.play("brokenRock", true);
        roche5.body.enable = false;
        rocksFall2_1.resume();
      },
    });

    rocksFall2_1 = this.tweens.add({
      targets: [roche2, roche4],
      paused: true,
      ease: "Sine.easeIn",
      duration: 500,
      yoyo: false,
      y: 50,
      delay: 0,
      hold: 800,
      onComplete: function () {
        hecter.anims.play("staticHecter", true);
        rocksFall2_2.resume();
        roche2.anims.play("fallingRock", true);
        roche4.anims.play("fallingRock", true);
      },
    });
    rocksFall2_2 = this.tweens.add({
      targets: [roche2, roche4],
      paused: true,
      ease: "Sine.easeIn",
      duration: 500,
      yoyo: false,
      y: 352,
      delay: 0,
      hold: 0,
      onComplete: function () {
        roche2.anims.play("breakingRock", true);
        roche4.anims.play("breakingRock", true);
        rocksFall2_3.resume();
      },
    });
    rocksFall2_3 = this.tweens.add({
      targets: [roche2, roche4],
      paused: true,
      ease: "Sine.easeIn",
      duration: 500,
      yoyo: false,
      y: "+=1",
      delay: 0,
      hold: 1500,
      onComplete: function () {
        hecter.anims.play("AttackHecter", true);
        roche2.anims.play("brokenRock", true);
        roche2.body.enable = false;
        roche4.anims.play("brokenRock", true);
        roche4.body.enable = false;
        roche1.anims.play("fallingRock", true);
        roche1.body.enable = true;
        roche3.anims.play("fallingRock", true);
        roche3.body.enable = true;
        roche5.anims.play("fallingRock", true);
        roche5.body.enable = true;
        rocksFall1_1.resume();
      },
    });
    hecter.anims.play("staticHecter", true);
  }

  update() {
    //-----------------------------------------------
    //Boss Sequence

    if (player.x > 5746 && startBossSequence === 0) {
      startBossSequence = 1;
      bossMusic.play();
      bossNoise2.play();
      musique2.stop();
    }
    if (startBossSequence === 1) {
      startBossSequence = 2;
      hecter.anims.play("attackHecter", true);
      rocksFall1_1.resume();
      //start animation
    }

    //Boss mouvement

    if (player.y > 567) {
      moves = false;
      this.physics.pause();
      player.setPosition(player.x, 566);
      deadSoul = this.physics.add.sprite(player.x, player.y, "deadSoul");
      deadSoul.anims.play("Soul", true);
      player.destroy();
      death.resume();
      musique2.stop();
      die.play();
    }
    death = this.tweens.add({
      targets: [player],
      paused: true,
      eases: "Linear",
      duration: 500,
      yoyo: false,
      delay: 1000,
      onComplete: function () {
        resume = true;
        musique2.stop();
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

function hit(hecter, bullet) {
  hecterHealth--;
  if (hecterHealth <= 0) {
    hecter.disableBody(true, true);
    bossMusic.stop();
    this.scene.start("level3");
  }
  bullet.destroy();
}
function bossHit(player, hecter) {
  moves = false;
  this.physics.pause();
  deadSoul = this.physics.add.sprite(player.x, player.y, "deadSoul");
  deadSoul.anims.play("Soul", true);
  player.destroy();
  die.play();
  bossMusic.stop();
  death.resume();
}

function cibleHit(player, cible) {
  moves = false;
  this.physics.pause();
  deadSoul = this.physics.add.sprite(player.x, player.y, "deadSoul");
  deadSoul.anims.play("Soul", true);
  player.destroy();
  die.play();
  bossMusic.stop();
  musique2.stop();
  death.resume();
}

function damageTaken() {
  soulieHealth--;
  if (soulieHealth === 0) {
    death.resume();
  }
}
