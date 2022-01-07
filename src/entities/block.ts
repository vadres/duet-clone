import { Bodies, Body } from "matter-js";
import { AbstractMatter } from "./abstract-matter";
import { drawRect } from "../service/pixi";

export class Block extends AbstractMatter {
  constructor(x: number, y: number, width: number, height: number){
    super();
    this.matter = Bodies.rectangle(x, y, width, height);
    this.view = drawRect(x - width / 2,y - height / 2 ,width,height);
  }
}