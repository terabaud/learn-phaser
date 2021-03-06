/// <reference path="../../lib/phaser.d.ts" />

class PongScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PongScene' });

    this.width = 800; // this.game.width?
    this.height = 600; // this.game.height?

    this.y1 = this.height / 2;
    this.y2 = this.height / 2;
    this.panelHeight = 150;
    this.panelWidth = 30;
    this.ballRadius = 20;
  }

  create() {
    const { y1, y2, panelHeight, panelWidth, width, height, ballRadius } = this;
    // this.physics.setBounce(1, 1);
    this.physics.world.setBounds(0, 0, 800, 600, true, true, true, true);
    // this.physics.setBounds(1, 1);
    const playerOne = this.add.rectangle(
      50,
      y1,
      panelWidth,
      panelHeight,
      0xff00ff,
      1.0
    );
    this.playerOne = this.physics.add.existing(playerOne);

    const playerTwo = this.add.rectangle(
      width - 50,
      y2,
      panelWidth,
      panelHeight,
      0x00ff00,
      1.0
    );
    this.playerTwo = this.physics.add.existing(playerTwo);

    const ball = this.add.ellipse(
      (width - ballRadius) / 2,
      (height - ballRadius) / 2,
      ballRadius * 2,
      ballRadius * 2,
      0xffffff,
      1.0
    );
    this.ball = this.physics.add.existing(ball);
    // todo: how to add physics to game objects?
    this.ball.body.setVelocity(200, 200);
    this.ball.body.setBounce(1);
    this.ball.body.setCollideWorldBounds(true);

    this.playerOne.body.setImmovable(true);
    this.playerTwo.body.setImmovable(true);
    this.physics.add.collider(ball, playerOne);
    this.physics.add.collider(ball, playerTwo);
    // this.ball.body.collideWith(this.playerOne);
    // this.ball.body.collideWith(this.playerTwo);
    // this.ballPhysics.setBounce(1, 1);
  }
}

const game = new Phaser.Game({
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [PongScene]
});
