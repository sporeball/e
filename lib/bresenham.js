/*
  Bresenham's line algorithm
  (https://www.npmjs.com/package/bresenham)
  copyright (c) Bence Dányi
  MIT license
*/

/**
 * calls a function for every point with integer coordinates
 * between the points (x0, y0) and (x1, y1)
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {function} fn
 */
const bresenham = (x0, y0, x1, y1, fn) => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);
  const sx = dx > 0 ? 1 : -1;
  const sy = dy > 0 ? 1 : -1;
  let eps = 0;

  if (adx > ady) {
    for (let x = x0, y = y0; sx < 0 ? x >= x1 : x <= x1; x += sx) {
      fn(x, y);
      eps += ady;
      if ((eps << 1) >= adx) {
        y += sy;
        eps -= adx;
      }
    }
  } else {
    for (let x = x0, y = y0; sy < 0 ? y >= y1 : y <= y1; y += sy) {
      fn(x, y);
      eps += adx;
      if ((eps << 1) >= ady) {
        x += sx;
        eps -= ady;
      }
    }
  }
};
