/*
  ui.js
  e user interface control
  copyright (c) 2022 sporeball
  MIT license
*/

import e from '../e.js';
import Canvas from './canvas.js';

// header and footer
const header = document.getElementById('header');
const footer = document.getElementById('footer');

// the color picker input itself
// (receives event, but is invisible)
const colorPicker = document.getElementById('color_picker');
// the square that shows its current color
const colorPickerLabel = document.getElementById('color_picker_label');

// status text
const statusLayer = document.getElementById('status_layer');
const statusEraser = document.getElementById('status_eraser');
const statusFocus = document.getElementById('status_focus');

/**
 * register event listeners
 * @public
 */
const init = () => {
  colorPicker.addEventListener('input', colorPickerChange, false);
};

/**
 * update the layer preview
 * @public
 */
const updatePreview = () => {
  const ctx = Canvas.layerPreview.getContext('2d');
  Canvas.layerPreview.width = 50; // clear
  ctx.drawImage(Canvas.canvas(), 0, 0, 50, 50); // redraw
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
 * update layer text
 * @public
 */
const updateLayer = () => {
  statusLayer.innerHTML = e.layer;
};

/**
 * toggle focus mode (hide unimportant elements)
 * @public
 */
const toggleFocusMode = () => {
  if (e.focus) {
    statusFocus.classList.replace('neg', 'pos');
    header.style.visibility = 'hidden';
    footer.style.display = 'none';
  } else {
    statusFocus.classList.replace('pos', 'neg');
    header.style.visibility = 'visible';
    footer.style.display = 'block';
  }
  statusFocus.innerHTML = (e.focus ? 'active' : 'inactive');
};

/**
 * fires when the color picker changes
 * @private
 */
const colorPickerChange = evt => {
  e.color = evt.target.value;
  colorPickerLabel.style.background = evt.target.value;
  Canvas.layerPseudo.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23${evt.target.value.slice(1)}" height="6" width="6"><path d="M 1 1 H 6 V 6 H 1 Z"/></svg>'), auto`;
};

export default {
  init,
  updatePreview,
  updateLayer,
  updateEraser,
  toggleFocusMode
};
