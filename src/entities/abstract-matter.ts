import { Body } from "matter-js";
import { Graphics, Application } from "pixi.js";

export abstract class AbstractMatter {
  protected _matter: Body;
  protected _view: any;

  get matter() { return this._matter; }
  set matter(matter) { this._matter  = matter; }
  get view() { return this._view; }
  set view(view) { this._view = view; }

  update(): void {
    this.view.rotation = this.matter.angle;
    this.view.x = this.matter.position.x;
    this.view.y = this.matter.position.y;
  }

  incrementAngle(angle: number): void {
    if (!this.matter.angle) this.matter.angle = 0;
    this.matter.angle += angle;
  }
}