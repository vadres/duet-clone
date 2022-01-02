export class Block {
  constructor(pixi, line) {
    this.pixi = pixi
    this.line = line
    this.speed = 4;
  }

  fall() {
    this.pixi.y += this.speed;
  }

  setRotation(angle) {
    this.pixi.rotation = angle;
  }
}