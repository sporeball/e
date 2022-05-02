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
const statusPreview = document.getElementById('status_preview');

/**
 * register event listeners
 * @public
 */
function init () {
  colorPicker.addEventListener('input', colorPickerChange, false);
}

// simple methods below

/**
 * update layer text
 * on: 1234
 * @public
 */
function updateLayerText () {
  statusLayer.innerHTML = e.layer;
}

/**
 * update eraser text
 * on: E
 * @public
 */
function updateEraserText () {
  statusEraser.innerHTML = (e.erasing ? 'on' : 'off');
  statusEraser.className = (e.erasing ? 'pos' : 'neg');
}

// advanced methods below

/**
 * redraw the layer preview
 * on: pointerup / pointerout / 1234
 * @public
 */
function updateLayerPreview () {
  const ctx = Canvas.layerPreview.getContext('2d');
  // clear
  Canvas.layerPreview.width = 50;
  // redraw
  ctx.drawImage(Canvas.getCanvas(), 0, 0, 50, 50);
}

/**
 * toggle focus mode (hide unimportant elements)
 * on: F
 * @public
 */
function toggleFocusMode () {
  if (e.focus) {
    header.style.visibility = 'hidden';
    footer.style.display = 'none';
  } else {
    header.style.visibility = 'visible';
    footer.style.display = 'block';
  }
  statusFocus.innerHTML = (e.focus ? 'on' : 'off');
  statusFocus.className = (e.focus ? 'pos' : 'neg');
}

/**
 * toggle the layer preview on and off
 * on: P
 * @public
 */
function toggleLayerPreview () {
  Canvas.layerPreview.style.display = (e.previewEnabled ? 'block' : 'none');
  statusPreview.innerHTML = (e.previewEnabled ? 'on' : 'off');
  statusPreview.className = (e.previewEnabled ? 'pos' : 'neg');
}

/**
 * fires when the color picker changes
 * @private
 */
function colorPickerChange (evt) {
  e.color = evt.target.value;
  colorPickerLabel.style.background = evt.target.value;
  Canvas.layerPseudo.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="7" width="7"><path d="M0,0H7V7H0Z"/><path d="M1,1H6V6H1Z" fill="%23${evt.target.value.slice(1)}"/></svg>'), auto`;
}

export default {
  init,
  updateLayerText,
  updateEraserText,
  updateLayerPreview,
  toggleLayerPreview,
  toggleFocusMode
};
