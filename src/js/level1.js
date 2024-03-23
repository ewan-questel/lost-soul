import Phaser from "phaser";
var baba;
var keyboard;
var player;
var z;
var q;
var d;
var space;
var doubleJump = true;
var groupeBullets;
var shoot;
var babaJump;
var babaFall;
var babaWakeUp;
var babaStay;
var startBossSequence;
var death;
var resume = false;
var babaAlive = true;
var babaHealth = 40;
var soulieHealth = 3;
var deadSoul;
var moves;
var enemymove;
var cible;
var musique1;
var deathSoundEffect;
var bossMusic;
var bossNoise;
var Shot;

export default class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }

  preload() {
    this.load.audio("musique1", "src/assets/OST/Map1.mp3");
    this.load.audio("die", "src/assets/Sound_effect/décès.mp3");
    this.load.audio("boss", "src/assets/OST/Boss.mp3");
    this.load.audio("noise", "src/assets/Sound_effect/Babies_Cry.mp3");
    this.load.image("bullet", "src/assets/soulie-flame-2.png");
    this.load.audio("bang", "src/assets/Sound_effect/Fireball.mp3");
  }

  create() {
    musique1 = this.sound.add("musique1", { volume: 0.2 });
    deathSoundEffect = this.sound.add("die", { volume: 0.5 });
    bossMusic = this.sound.add("boss", { volume: 0.2 });
    bossNoise = this.sound.add("noise", { volume: 0.6 });
    Shot = this.sound.add("bang", { volume: 0.5 });
    musique1.play();
    moves = true;
    startBossSequence = 0;
    // insert background image
    this.add.image(3072, 400, "backgroundImage");

    const levelMap = this.add.tilemap("levelMap");

    const tileset = levelMap.addTilesetImage("tileset", "level1Tiles");
    // platforms
    const Platform = levelMap.createLayer("Platform", tileset);
    Platform.setCollisionByProperty({ isSolid: true });
    // uninteractable obects and others
    const Inanimate1 = levelMap.createLayer("Inanimate1", tileset);
    const Inanimate2 = levelMap.createLayer("Inanimate2", tileset);
    const Inanimate3 = levelMap.createLayer("Inanimate3", tileset);

    //player
    player = this.physics.add.sprite(200, 200, "player");
    player.setCollideWorldBounds(true);

    //baba

    baba = this.physics.add.sprite(5812, 450, "baba").setDepth(1);
    baba.setCollideWorldBounds(true);
    baba.body.allowGravity = false;

    this.physics.add.collider(player, Platform);
    this.physics.add.collider(baba, Platform);

    groupeBullets = this.physics.add.group();
    this.physics.add.overlap(groupeBullets, baba, hit, null, this);

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
    //enemy animation
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

    this.physics.world.setBounds(0, 0, 6144, 800);
    this.cameras.main.setBounds(0, 0, 6144, 800);
    this.cameras.main.startFollow(player);
    /* this.cameras.main.setZoom(1.5); */

    this.anims.create({
      key: "baba1",
      frames: [{ key: "baba", frame: 0 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "baba2",
      frames: [{ key: "baba", frame: 1 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "baba3",
      frames: [{ key: "baba", frame: 2 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "baba4",
      frames: [{ key: "baba", frame: 3 }],
      frameRate: 10,
    });

    this.physics.add.overlap(player, baba, bossHit, null, this);

    this.physics.add.collider(player, Platform);

    cible = this.physics.add.group();
    var e1 = cible.create(2102, 448, "cible");
    var e2 = cible.create(2551, 448, "cible");
    var e3 = cible.create(2999, 352, "cible");

    //this.physics.add.collider(cible, player);
    this.physics.add.collider(cible, Platform);
    this.physics.add.overlap(player, cible, cibleHit, null, this);
    this.physics.add.overlap(groupeBullets, cible, enemyHit, null, this);
    cible.children.iterate(function (cibleTrouvee) {
      cibleTrouvee.pointsVie = 3;
      cibleTrouvee.y = Phaser.Math.Between(10, 250);
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
  }

  update() {
    //-----------------------------------------------
    //Boss Sequence

    if (player.x > 5397 && startBossSequence === 0) {
      startBossSequence = 1;
      musique1.stop();
      bossNoise.play();
      bossMusic.play();
    }
    if (startBossSequence === 1) {
      startBossSequence = 2;
      baba.anims.play("baba2", true);
      babaJump.resume();
    }
    //Boss mouvement
    babaJump = this.tweens.add({
      targets: [baba],
      paused: true,
      ease: "Sine",
      duration: 500,
      yoyo: false,
      y: 180,
      x: player.x,
      delay: 0,
      hold: 0,
      onComplete: function () {
        baba.anims.play("baba3", true);
        babaFall.resume();
      },
    });
    babaFall = this.tweens.add({
      targets: [baba],
      paused: true,
      ease: "Sine.easeIn",
      duration: 500,
      yoyo: false,
      y: 450,
      delay: 0,
      hold: 800,
      onComplete: function () {
        baba.anims.play("baba4", true);
        babaWakeUp.resume();
      },
    });
    babaWakeUp = this.tweens.add({
      targets: [baba],
      paused: true,
      ease: "Linear",
      duration: 500,
      yoyo: false,
      x: "+=1",
      delay: 0,
      hold: 500,
      onComplete: function () {
        baba.anims.play("baba1", true);
        babaStay.resume();
      },
    });
    babaStay = this.tweens.add({
      targets: [baba],
      paused: true,
      ease: "Linear",
      duration: 500,
      yoyo: false,
      x: "-=1",
      delay: 0,
      hold: 500,
      onComplete: function () {
        baba.anims.play("baba2", true);
        babaJump.resume();
      },
      //player death
      //fall
    });
    if (player.y > 740) {
      moves = false;
      this.physics.pause();
      player.setPosition(player.x, 739);
      deadSoul = this.physics.add.sprite(player.x, player.y, "deadSoul");
      deadSoul.anims.play("Soul", true);
      player.destroy();
      deathSoundEffect.play();
      death.resume();
    }
    death = this.tweens.add({
      targets: [player],
      paused: true,
      eases: "Linear",
      duration: 500,
      yoyo: false,
      delay: 4000,
      onComplete: function () {
        resume = true;
        musique1.stop();
        bossMusic.stop();
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
  }
  bullet.destroy();
}

function hit(baba, bullet) {
  babaHealth--;
  if (babaHealth <= 0) {
    baba.disableBody(true, true);
    musique1.stop();
    bossMusic.stop();
    this.scene.start("level2");
  }
  bullet.destroy();
}
function bossHit(player, baba) {
  moves = false;
  this.physics.pause();
  deadSoul = this.physics.add.sprite(player.x, player.y, "deadSoul");
  deadSoul.anims.play("Soul", true);
  player.destroy();
  deathSoundEffect.play();
  death.resume();
}

function cibleHit(player, cible) {
  moves = false;
  this.physics.pause();
  deadSoul = this.physics.add.sprite(player.x, player.y, "deadSoul");
  deadSoul.anims.play("Soul", true);
  player.destroy();
  deathSoundEffect.play();
  death.resume();
}

function damageTaken() {
  soulieHealth--;
  if (soulieHealth === 0) {
    death.resume();
  }
}
