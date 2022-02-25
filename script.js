/*
  e (絵)
  copyright (c) 2022 sporeball
  MIT license
*/

import bresenham from './lib/bresenham.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let drawing = false;

let curX, curY;
let lastX, lastY;

// drawing event
const drawEvent = evt => {
  // figure out where it happened
  // floored for extra scribbly
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(evt.clientX - rect.left);
  const y = Math.floor(evt.clientY - rect.top);
  // draw
  draw(x, y);

  // the last position is what the current position was a second ago
  lastX = curX;
  lastY = curY;
  // the current position is what we figured out
  curX = x;
  curY = y;

  // draw a line if all four coordinates exist
  if (lastX && lastY && curX && curY && drawing) {
    bresenham(lastX, lastY, curX, curY, (fx, fy) => draw(fx, fy));
  }
};

const draw = (x, y) => {
  ctx.fillStyle = (drawing ? '#333' : 'rgba(0, 0, 0, 0)');
  ctx.fillRect(x, y, 5, 5);
};

// browser events
document.onmousedown = evt => {
  drawing = true;
  drawEvent(evt);
};

document.onmousemove = evt => {
  drawEvent(evt);
};

document.onmouseup = evt => {
  drawing = false;
};
