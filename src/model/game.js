import { 
  getRelativeX
 } from '../utils/constants';
import constants from '../utils/constants';
import { Duet } from '../model/duet';
import { Block } from '../model/block';
import { drawRect } from '../service/pixi';

export class Game {
  constructor(round, stage, ticker, renderer) {
    this.round = round;
    this.blocks = [];
    this.elapsed = constants.ELAPSED_TICK;
    this.stage = stage;
    this.ticker = ticker;
    this.renderer = renderer;
    this.isPlaying = true;
    this.duet = null;
  } 

  play() {
    this.duet = new Duet(this.stage);

    let line = 0;
    
    this.ticker.add((delta) => {
      this.renderer.render(this.stage);
      if (this.isPlaying) {
        if (this.duet.collision(this.blocks)) {
          this.isPlaying = false;
        } else {
          this.duet.move();
          this.elapsed++;
          if (this.elapsed >= constants.ELAPSED_TICK) {
            this.readBlocks(line);
            this.elapsed = 0;
          }

          this.blocks.forEach(block => block.fall());
      
          this.resetPositions();
          line = line === this.round.length - 1? 0: line + 1;     
        } 
      }
    });
  }

  readBlocks(line) {  
      const lineBlocks = this.round[line];
      const positionY = constants.INITIAL_POSITION; 

      for (let i = 0; i < lineBlocks.length; i++) {
        let width = 0;
        while (lineBlocks[i] === '-') {
          width += constants.BLOCK_WIDTH;
          i++;
        }
        let pos = getRelativeX(i * constants.BLOCK_WIDTH, width * 5);
        if (width > 0) {
          const block = new Block(drawRect(width, pos, positionY), line);
          this.blocks.push(block);
          this.stage.addChild(block.pixi);
        }

      }   
  }

  resetPositions() {
    for (let i = 0; i < this.blocks.length; i++) {
      const block = this.blocks[i];
      if (block) {
        if (block.pixi.y > window.innerHeight) {
          setTimeout (() => {
            block.pixi.destroy();
            delete this.blocks[i];
          }, 3000);
        }
      }
    }
  }

}