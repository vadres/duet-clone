import { Bodies, Body } from "matter-js";
import { drawCircle, drawLineCircle } from "../service/pixi";
import { AbstractMatter } from "./abstract-matter";

export type CircleInput = {
  image?: string
  x: number
  y: number 
  radius: number
  options?: any
}

export class Circle extends AbstractMatter {
  constructor(input: CircleInput) {
    super();
    if (input.image) this.initImageCircle(input);
    else this.initLineCircle(input);
  }

  initImageCircle(input: CircleInput) {
    this.matter = Bodies.circle(input.x, input.y, input.radius / 2, input.options);
    this.view = drawCircle(input.image, input.x, input.y, input.radius);
  }

  initLineCircle(input: CircleInput) {
    this.view = drawLineCircle(input.x, input.y, input.radius);
  }

  update(): void {
    Body.setPosition(this.matter, { x: this.view.x + this.view.width / 2, y: this.view.y + this.view.height / 2 });
  }
}