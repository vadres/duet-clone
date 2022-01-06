import { Graphics, Sprite } from "pixi.js";
import constants from "../utils/constants";

export function drawRect(x: number, y: number, width: number, height: number) {
  const graphics = new Graphics();

  graphics.beginFill(0xDDDDDD);  
  graphics.drawRect(x, y, width, height);
  
  return graphics;
}

export function drawCircle(image: string, x: number, y: number, radius: number) {
  const circle = Sprite.from(image);
  circle.position.set(x, y);
  circle.width = radius;
  circle.height = radius;
  circle.anchor.set(0);
  circle.pivot.x = radius / 2;
  circle.pivot.y = radius / 2;
  return circle;
}

export function drawLineCircle(width: number, x: number, y: number) {
  const graphics = new Graphics();
  graphics.lineStyle(2, 0xFEEBEE, 0.2);
  graphics.beginFill(0x000000, 0.1);
  graphics.drawCircle(x, y, width);
  graphics.endFill();
  return graphics;
}