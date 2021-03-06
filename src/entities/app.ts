import { Engine, Composite } from "matter-js";
import { Application } from "pixi.js";
import { Duet } from "./duet";
import { AbstractMatter } from "./abstract-matter";

export class App {
  objects: Array<AbstractMatter> = [];
  duet: Duet;
  
  constructor(
    private readonly _app: Application,
    private readonly _engine: Engine
  ) {
    document.body.appendChild(_app.view);
    this.engine.gravity.y = 0.2;
  }

  get app() { return this._app }
  get engine() { return this._engine }

  objToWorld(obj: AbstractMatter) {
    this.app.stage.addChild(obj.view);
    Composite.add(this.engine.world, obj.matter);
    this.objects.push(obj);
  }

  addDuet(duet: Duet) {
    this.duet = duet;

    this.app.stage.addChild(duet.line.view);
    this.app.stage.addChild(duet.blue.view);
    this.app.stage.addChild(duet.red.view);
    
    Composite.add(this.engine.world, duet.blue.matter);
    Composite.add(this.engine.world, duet.red.matter);
  }

  update() {
    this.duet.move();
    this.objects = this.objects.filter(obj => obj.view.y < window.innerHeight + 100);
    this.objects.forEach(obj => {      
      obj.update()
    });
  }

  isPlaying() {
    return  this.objects.filter(obj => this.duet.collides(obj)).length < 1;
  }
}