import round01 from "./data/round01";
import { Game } from './model/game';

export const app = new PIXI.Application({
  width: 440,
  height: window.innerHeight,
  backgroundColor: 0x303030,
  resolution: window.devicePixelRatio || 1,
}); 

document.body.appendChild(app.view);

const game = new Game(round01, app);
game.play();
