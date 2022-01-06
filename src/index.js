import "./resources/style/main.scss";
import round01 from "./resources/rounds/round01";
import { Game } from './service/game';

// export const renderer = new PIXI.autoDetectRenderer({
 
//   transparent: true
// }); 

// const app = new PIXI.Application({ 
//   transparent: true,
//   width: window.innerWidth,
//   height: window.innerHeight,
//   resolution: window.devicePixelRatio || 1
//  });

// const world = new World();

// let stage = new PIXI.Container();
// let ticker = PIXI.Ticker.shared;

// //document.body.appendChild(renderer.view);

// const game = new Game(round01, stage, ticker, renderer);
// requestAnimationFrame(() => game.play());

const game = new Game();
game.play();