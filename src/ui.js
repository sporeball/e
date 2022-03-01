/*
  ui.js
  e user interface control
  copyright (c) 2022 sporeball
  MIT license
*/

import e from '../e.js';

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
  colorPicker.addEventListener('change', colorPickerChange, false);
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
 * fires when the color picker is dismissed
 */
const colorPickerChange = evt => {
  e.color = evt.target.value;
  colorPickerLabel.style.background = evt.target.value;
};

export default {
  init,
  updateEraser
};
