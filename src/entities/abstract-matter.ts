import { Body } from "matter-js";
import { Graphics, Application } from "pixi.js";

export abstract class AbstractMatter {
  matter: Body;
  view: any;

  update(): void {
    this.view.rotation = this.matter.angle;
    this.view.x = this.matter.position.x - this.view.width / 2;
    this.view.y = this.matter.position.y - this.view.height / 2;
  }

  incrementAngle(angle: number): void {
    if (!this.matter.angle) this.matter.angle = 0;
    this.matter.angle += angle;
  }
}