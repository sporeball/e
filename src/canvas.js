/*
  canvas.js
  e main drawing control
  copyright (c) 2022 sporeball
  MIT license
*/

import e from '../e.js';
import bresenham from '../lib/bresenham.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/**
 * drawing event
 * @public
 */
const drawEvent = (evt, moving = false) => {
  // figure out where it happened
  // floored for extra scribbly
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(evt.clientX - rect.left);
  const y = Math.floor(evt.clientY - rect.top);
  // draw
  draw(x, y);

  // the last position is what the current position was a second ago
  e.prevX = e.curX;
  e.prevY = e.curY;
  // the current position is what we figured out
  e.curX = x;
  e.curY = y;

  // draw a line if all four coordinates exist
  if (e.prevX && e.prevY && e.curX && e.curY && moving) {
    bresenham(e.prevX, e.prevY, e.curX, e.curY, (fx, fy) => draw(fx, fy));
  }
};

/**
 * draw function
 * this is the one that actually changes the canvas
 */
const draw = (x, y) => {
  ctx.fillStyle = e.color;
  ctx.globalCompositeOperation = e.erasing ? 'destination-out' : 'source-over';
  ctx.fillRect(x, y, 5, 5);
};

export default {
  canvas,
  ctx,
  drawEvent
};
