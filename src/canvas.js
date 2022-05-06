/*
  canvas.js
  e main drawing control
  copyright (c) 2022 sporeball
  MIT license
*/

import e from '../e.js';
import bresenham from '../lib/bresenham.js';

// preview of the current numbered layer
const layerPreview = document.getElementById('layer_preview');
// this layer is completely private
// when saving, the numbered layers will be composited here
const layerComposite = document.getElementById('layer_composite');
// this layer is placed above the numbered layers
// it exists only to receive mouse events
const layerPseudo = document.getElementById('layer_pseudo');

// integers to form shape data
const shapes = [
  [0, 62, 62, 62, 62, 62, 0], // square
  [8, 62, 62, 127, 62, 62, 8], // square with nibs
  [0, 28, 62, 62, 62, 28, 0], // "circle"
  [0, 8, 28, 62, 28, 8, 0], // starbursty
];

/**
 * drawing event
 * @param {MouseEvent} evt
 * @param {boolean} [moving] whether the cursor is moving.
 *   if true, lines will be drawn to fill any gaps
 * @public
 */
function drawEvent (evt, moving = false) {
  // figure out where it happened
  // floored for extra scribbly
  const rect = getCanvas().getBoundingClientRect();
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
}

/**
 * draw function
 * this is the one that actually changes the canvas
 * @private
 */
function draw (x, y) {
  const ctx = getCtx();
  ctx.fillStyle = e.color;
  ctx.globalCompositeOperation = e.erasing ? 'destination-out' : 'source-over';

  // pick a shape
  let shape = shapes[Math.floor(Math.random() * shapes.length)];
  for (let field = 0; field < 7; field++) {
    for (let bit = 0; bit <= 6; bit++) {
      // draw just one pixel for every bit that's set
      if (shape[field] & (2 ** bit)) {
        ctx.fillRect(x + bit, y + field, 1, 1);
      }
    }
  }
}

/**
 * get the canvas tied to a numbered layer
 * @param {number} [layer]
 * @public
 */
function getCanvas (layer = e.layer) {
  return document.getElementById(`layer_${layer}`);
}

/**
 * get the context of the canvas tied to a numbered layer
 * @param {number} [layer]
 * @public
 */
function getCtx (layer = e.layer) {
  return getCanvas(layer).getContext('2d');
}

export default {
  layerPreview,
  layerComposite,
  layerPseudo,
  drawEvent,
  getCanvas,
  getCtx
};
