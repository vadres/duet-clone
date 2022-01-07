import { Body, SAT } from "matter-js";
import { Circle } from "./circle";
import { Block } from "./block";
import constants from "../utils/constants";
import { keyboard } from "../utils/keyboard";

let half = constants.CANVAS_WIDTH / 2;
let bottomRelation = constants.CANVAS_HEIGHT - 150;

export class Duet {
  leftRotation: number = 0;
  rightRotation: number = 0;
  rotation: number = 0;
  blue: Circle;
  red: Circle;
  line: Circle;

  constructor() {
    const options = { 
      isStatic: true,
    };

    this.blue = new Circle({ image: "img/blue.png", x: half, y: bottomRelation, radius: 33, options });
    this.red  = new Circle({ image: "img/red.png", x: half, y: bottomRelation, radius: 33, options });
    this.line = new Circle({ x: half, y: bottomRelation, radius: 75, options });
    
    this.keyListeners();
    half -= 15;
    bottomRelation -= 15;
  }

  collides(block: Block): boolean {
    if (!block) return false;

    return SAT.collides(block.matter, this.blue.matter)?.collided
        || SAT.collides(block.matter, this.red.matter)?.collided;
  }

  move() {   
    this.rotation += this.leftRotation + this.rightRotation;

    this.blue.view.x = half + 75 * Math.cos(this.rotation);
    this.blue.view.y = bottomRelation + 75 * Math.sin(this.rotation);

    this.red.view.x = half - 75 * Math.cos(this.rotation);
    this.red.view.y = bottomRelation - 75 * Math.sin(this.rotation);

    this.blue.update();
    this.red.update();
  }

  keyListeners() {
    const left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    left.press = () => this.leftRotation += -.05;
    left.release = () => this.leftRotation = 0;
    right.press = () => this.rightRotation += .05;
    right.release = () => this.rightRotation = 0;
  }  
}