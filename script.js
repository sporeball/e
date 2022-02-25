/*
  e (絵)
  copyright (c) 2022 sporeball
  MIT license
*/

import bresenham from './lib/bresenham.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('color_picker');
const colorPickerLabel = document.getElementById('color_picker_label');

const statusEraser = document.getElementById('status_eraser');

let color = '#333333';
let click = false;
let erasing = false;

let curX, curY;
let lastX, lastY;

// drawing event
const drawEvent = (evt, moving = false) => {
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
  if (lastX && lastY && curX && curY && moving) {
    bresenham(lastX, lastY, curX, curY, (fx, fy) => draw(fx, fy));
  }
};

const draw = (x, y) => {
  ctx.fillStyle = erasing ? '#fff' : color;
  ctx.fillRect(x, y, 5, 5);
};

colorPicker.addEventListener('change', evt => {
  color = evt.target.value;
  colorPickerLabel.style.background = evt.target.value;
}, false);

const updateStatusEraser = () => {
  if (erasing) {
    statusEraser.classList.replace('neg', 'pos');
  } else {
    statusEraser.classList.replace('pos', 'neg');
  }
  statusEraser.innerHTML = (erasing ? 'active' : 'inactive');
};

// browser events
document.onmousedown = evt => {
  click = true;
  drawEvent(evt);
};

document.onmousemove = evt => {
  if (click) {
    drawEvent(evt, true);
  }
};

document.onmouseup = evt => {
  click = false;
};

document.onkeydown = evt => {
  switch (evt.key) {
    case 'b':
      erasing = false;
      updateStatusEraser();
      break;
    case 'e':
      erasing = true;
      updateStatusEraser();
      break;
  }
};
