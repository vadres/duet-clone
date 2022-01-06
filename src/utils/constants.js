export default {
  BLOCK_WIDTH: 40,
  BLOCK_HEIGHT: 20,
  INITIAL_POSITION: -20,
  ELAPSED_TICK: 100,
  CANVAS_WIDTH: 1000,
}

export const getRelativeX = (originalX, width) => {
  return (originalX + window.innerWidth / 2) - width / 2;
}
