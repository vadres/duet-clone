import { 
  spaceBetween,
  blockWidth,
  blockHeight,
 } from '../service/size';
import { Duet } from '../model/duet';
import { Block } from '../model/block';
import { drawRect } from '../service/pixi';

export class Game {
  constructor(round, app) {
    this.round = round;
    this.blocks = [];
    this.elapsed = 30;
    this.app = app;
    this.isPlaying = true;
    this.duet = null;
  } 

  play() {
    this.duet = new Duet(this.app);

    let line = 0;
    
    this.app.ticker.add((delta) => {
      if (this.isPlaying) {
        this.isPlaying = !this.duet.collision(this.blocks);
        this.duet.move();
        this.elapsed++;
        if (this.elapsed >= 30) {
          this.readBlocks(line);
          this.elapsed = 0;
        }

        for (const block of this.blocks) {
          if (block) block.pixi.y = block.pixi.y + Math.cos(0.0/40.0) * 6;
        }
    
        this.resetPositions();
        line = line === this.round.length - 1? 0: line + 1;      
      }
    });
  }

  readBlocks(line) {  
    console.log(line)
      const lineBlocks = this.round[line];
      const positionY = this.getBlockLocation(line); 

      for (let i = 0; i < lineBlocks.length; i++) {
        let width = 0;
        let pos = i * blockWidth;
        while (lineBlocks[i] === '-') {
          width += blockWidth;
          i++;
        }
        if (width > 0) {
          const block = new Block(drawRect(width, pos, positionY), line);
          this.blocks.push(block);
          this.app.stage.addChild(block.pixi);
        }

      }   
  }

  resetPositions() {
    for (let i = 0; i < this.blocks.length; i++) {
      const block = this.blocks[i];
      if (block) {
        if (block.pixi.y > window.innerHeight + spaceBetween) {
          block.pixi.destroy();
          delete this.blocks[i];
        }
      }
    }
  }

  getSizePhase() {
    return ((this.round.length - 1) * spaceBetween) +
      ((this.round.length - 1) * blockHeight);
  }

  getBlockLocation(line) {
    return (spaceBetween * line) - (this.getSizePhase() - ((this.round.length - 1 - line) * spaceBetween) +
      ((this.round.length - 1 - line) * blockHeight));
  }
}