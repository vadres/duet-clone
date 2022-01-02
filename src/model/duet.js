import { keyboard } from '../utils/keyboard';
import { drawCircle, drawLineCircle } from '../service/pixi';
import { getRelativeX } from '../utils/constants';

function AABB(block, circle) {
  const bounds1 = block?.pixi.getBounds();
  const bounds2 = circle.getBounds();

  if (!bounds1) { return false; }

  return bounds1.x < bounds2.x + bounds2.width
    && bounds1.x + bounds1.width > bounds2.x
    && bounds1.y < bounds2.y + bounds2.height
    && bounds1.y + bounds1.height > bounds2.y;
}

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
      if (AABB(block, this.red) || AABB(block, this.blue)) {
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