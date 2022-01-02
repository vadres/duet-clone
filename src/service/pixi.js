import { blockHeight } from "./size";

export function drawRect(width, x, y) {
  const rect = new PIXI.Sprite(PIXI.Texture.WHITE);
  rect.position.set(x, y);
  rect.width = width;
  rect.height = blockHeight;
  rect.acceleration = new PIXI.Point(0);
  rect.mass = 1;
  return rect;
}

export function drawCircle(image, width, x, y) {
  const circle = PIXI.Sprite.from(image);
  circle.position.set(x, y);
  circle.width = width;
  circle.height = width;
  circle.acceleration = new PIXI.Point(0);
  circle.anchor.set(0);
  circle.mass = 1;
  circle.vx = 0;
  circle.vy = 0;
  return circle;
}

export function drawLineCircle(width, x, y) {
  const graphics = new PIXI.Graphics();
  graphics.lineStyle(2, 0xFEEBEE, 0.2);
  graphics.beginFill(0x000000, 0.1);
  graphics.drawCircle(x, y, width);
  graphics.endFill();
  return graphics;
}