import { keyboard } from '../utils/keyboard';
import { drawCircle, drawLineCircle } from '../service/pixi';
import { getRelativeX } from '../utils/constants';
import { collisionCircleAndRect } from '../service/collision';

export class Duet {
  constructor(stage) {
    let lineCircle = drawLineCircle(75, getRelativeX(225, 450), window.innerHeight - 185);
    let red = drawCircle('img/red.png', 30, 0, 0);
    let blue = drawCircle('img/blue.png', 30, 150, 0);
    let container = new PIXI.Container();
    container.addChild(blue);
    container.addChild(red);

    container.x = getRelativeX(225, 450);
    container.y = window.innerHeight - 185;
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    stage.addChild(lineCircle);
    stage.addChild(container);

    this.red = red;
    this.blue = blue;
    this.container = container;
    this.container.left = 0;
    this.container.right = 0;
    this.keyListeners();
  }

  collision(blocks) {
    for (const block of blocks) {
      if (collisionCircleAndRect(this.red, block) || collisionCircleAndRect(this.blue, block)) {
        return true;
      }
    }
    return false;
  }

  move() {
    this.container.rotation += this.container.left + this.container.right
  }

  keyListeners() {
    const left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    left.press = () => this.container.left = -.1;
    left.release = () => this.container.left = 0; this.container.rotation = 0;
    right.press = () => this.container.right = .1;
    right.release = () => this.container.right = 0; this.container.rotation = 0;
  }

}