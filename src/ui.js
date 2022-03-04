/*
  ui.js
  e user interface control
  copyright (c) 2022 sporeball
  MIT license
*/

import e from '../e.js';
import Canvas from './canvas.js';

// the color picker input itself
const colorPicker = document.getElementById('color_picker');
// the square that shows its current color
const colorPickerLabel = document.getElementById('color_picker_label');

// status text
const statusEraser = document.getElementById('status_eraser');

/**
 * register event listeners
 * @public
 */
const init = () => {
  colorPicker.addEventListener('input', colorPickerChange, false);
};

/**
 * update eraser text
 * @public
 */
const updateEraser = () => {
  if (e.erasing) {
    statusEraser.classList.replace('neg', 'pos');
  } else {
    statusEraser.classList.replace('pos', 'neg');
  }
  statusEraser.innerHTML = (e.erasing ? 'active' : 'inactive');
};

/**
 * fires when the color picker changes
 */
const colorPickerChange = evt => {
  e.color = evt.target.value;
  colorPickerLabel.style.background = evt.target.value;
  Canvas.canvas.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23${evt.target.value.slice(1)}" height="6" width="6"><path d="M 1 1 H 6 V 6 H 1 Z"/></svg>'), auto`;
};

export default {
  init,
  updateEraser
};
