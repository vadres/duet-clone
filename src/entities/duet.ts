import { SAT } from "matter-js";
import { Circle } from "./circle";
import { AbstractMatter } from "./abstract-matter";
import { Block } from "./block";
import { drawLineCircle } from "../service/pixi";

export class Duet {
  blue: Circle;
  red: Circle;
  line: Circle;

  constructor() {
    const options = { isStatic: true };
    this.line = new Circle({ x:75, y: 225, radius: window.innerHeight - 185, options });
    this.blue = new Circle({ image: "img/blue.png", x: 20, y: 20, radius: 30, options });
    this.red  = new Circle({ image: "img/blue.png", x: 20, y: 20, radius: 30, options });
  }

  collides(block: Block): boolean {
    return SAT.collides(block.matter, this.blue.matter).collided
        || SAT.collides(block.matter, this.red.matter).collided;
  }
}