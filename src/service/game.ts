import round01 from "../resources/rounds/round01";
import constants from '../utils/constants';
import { Engine, Render, Runner, World } from "matter-js";
import { Application, Ticker } from "pixi.js";
import { App } from "../entities/app";
import { Block } from "../entities/block";
import { Duet } from "../entities/duet";
import { drawRect } from "./pixi";

let ticker = Ticker.shared;

export class Game {
  application: App;
  playing: boolean;

  constructor() {
    this.application = new App(initPixi(), initMatter());
    this.application.addDuet(new Duet());
    this.playing = true;
  }  

  play() { 
    let counter = 0,
        line = 0; 

    ticker.add((delta) => {
      if (this.playing) {
        if (counter >= 40) {
          counter = 0;
          line = line === round01.length - 1? 0: line + 1;
          this.readBlock(line);
        }
        counter += delta;
        this.application.update();
      //  this.playing = this.application.isPlaying();
      }
    });
  }

  readBlock(line: number) {  
    const lineBlocks = round01[line];

    for (let i = 0; i < lineBlocks.length; i++) {
      let width = 0;
      let posI = -1;
      while (lineBlocks[i] === '-') {
        if (posI === -1) posI = i;
        width += constants.BLOCK_WIDTH;
        i++;
      }
      
      const posX = (posI * constants.BLOCK_WIDTH) + constants.CANVAS_WIDTH / 2 - 175;
      const posY = constants.INITIAL_POSITION; 

      if (width > 0) {
        const block = new Block(posX, posY, width, constants.BLOCK_HEIGHT);
        this.application.objToWorld(block); 
        posI = -1;
      }

    }   
  }
}

function initPixi(): Application {
  return new Application({ 
    backgroundColor: 0x303030,
    width: constants.CANVAS_WIDTH,
    height: constants.CANVAS_HEIGHT,
    resolution: 1
   });
}

function initMatter(): Engine {
  const engine = Engine.create();
  var runner = Runner.create();
  Runner.run(runner, engine);
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: constants.CANVAS_WIDTH,
        height: constants.CANVAS_HEIGHT,
        showAngleIndicator: true
    }
  });
  Render.run(render);
  return engine;
}