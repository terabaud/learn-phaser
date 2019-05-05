class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }

  preload() {
    // for animated, try this.load.spritesheet
    this.load.image('water', 'assets/water.png');
    this.load.image('sand', 'assets/sand.png');
    this.load.image('grass', 'assets/grass.png');
  }

  create() {
    /*
    this.anims.create({
      key: 'water',
      frames: this.anims.generateFrameNumbers('water'),
      frameRate: 5,
      repeat: -1
    }); */
    this.chunkSize = 16;
    this.tileSize = 16;
    this.cameraSpeed = 10;

    this.cameras.main.setZoom(2);
    this.followPoint = new Phaser.Math.Vector2(
      this.cameras.main.worldView.x + this.cameras.main.worldView.width * 0.5,
      this.cameras.main.worldView.y + this.cameras.main.worldView.height * 0.5
    );
    this.chunks = [];
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  getChunk(x, y) {
    for (var i = 0; i < this.chunks.length; i++) {
      if (this.chunks[i].x === x && this.chunks[i].y === y) {
        return this.chunks[i];
      }
    }
    return null;
  }

  update() {
    var snappedChunkX =
      this.chunkSize *
      this.tileSize *
      Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
    var snappedChunkY =
      this.chunkSize *
      this.tileSize *
      Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));
    snappedChunkX = (snappedChunkX / this.chunkSize / this.tileSize) | 0;
    snappedChunkY = (snappedChunkY / this.chunkSize / this.tileSize) | 0;
    for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        if (this.getChunk(x, y) === null) {
          let newChunk = new Chunk(this, x, y);
          this.chunks.push(newChunk);
        }
      }
    }

    for (let i = 0; i < this.chunks.length; i++) {
      let chunk = this.chunks[i];
      if (
        Phaser.Math.Distance.Between(
          snappedChunkX,
          snappedChunkY,
          chunk.x,
          chunk.y
        ) < 3
      ) {
        if (chunk !== null) {
          chunk.load();
        }
      } else {
        if (chunk !== null) {
          chunk.unload();
        }
      }
    }

    if (this.keyW.isDown) {
      this.followPoint.y -= this.cameraSpeed;
    }
    if (this.keyS.isDown) {
      this.followPoint.y += this.cameraSpeed;
    }
    if (this.keyA.isDown) {
      this.followPoint.x -= this.cameraSpeed;
    }
    if (this.keyD.isDown) {
      this.followPoint.x += this.cameraSpeed;
    }
    this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
  }
}
