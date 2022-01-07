import { Graphics, Point, Sprite, Texture } from "pixi.js";
import constants from "../utils/constants";

export function drawRect(x: number, y: number, width: number, height: number) {
  const rect = new Sprite(Texture.WHITE);
  rect._tintRGB = 0xDDDDDD;
  rect.position.set(x - width / 2, y - height / 2);
  rect.width = width;
  rect.height = height;
  return rect;
}

export function drawCircle(image: string, x: number, y: number, radius: number) {
  const circle = Sprite.from(image);
  circle.position.set(x, y);
  circle.width = radius;
  circle.height = radius;
  return circle;
}

export function drawLineCircle(x: number, y: number, width: number) {
  const graphics = new Graphics();
  graphics.lineStyle(2, 0xFEEBEE, 0.2);
  graphics.beginFill(0x000000, 0.1);
  graphics.drawCircle(x, y, width);
  graphics.endFill();
  return graphics;
}