import Matter from "matter-js";

const Engine = Matter.Engine,     
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

export class World {
  constructor() {
    this.engine = Engine.create();
    this.world = this.engine.world;   
    this.runner = Runner.create();

    this.addRect(50, 10, 100, 20, 20);
  }

  addRect({ rotation, x, y, width, height }) {
    const box = Bodies.rectangle(x, y, width, height);
    const box2 = Bodies.rectangle(400, 600, 800, 20, { isStatic: true });
    Composite.add(this.world, [ box, box2 ]);   
    Runner.run(this.runner, this.engine);
  }
}