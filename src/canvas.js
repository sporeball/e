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

// this layer is placed directly above the numbered layers
// it exists only to receive mouse events
const layerPseudo = document.getElementById('layer_pseudo');

/**
 * drawing event
 * @param {MouseEvent} evt
 * @param {boolean} [moving] whether the cursor is moving.
 *   if true, lines will be drawn to fill any gaps
 * @public
 */
const drawEvent = (evt, moving = false) => {
  // figure out where it happened
  // floored for extra scribbly
  const rect = canvas().getBoundingClientRect();
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
 * @private
 */
const draw = (x, y) => {
  const curCtx = ctx();
  curCtx.fillStyle = e.color;
  curCtx.globalCompositeOperation = e.erasing ? 'destination-out' : 'source-over';
  curCtx.fillRect(x, y, 5, 5);
};

/**
 * get the canvas tied to a numbered layer
 * @param {number} [layer]
 * @public
 */
const canvas = (layer = e.layer) => {
  return document.getElementById(`layer_${layer}`);
};

/**
 * get the context of the canvas tied to a numbered layer
 * @param {number} [layer]
 * @public
 */
const ctx = (layer = e.layer) => {
  return canvas(layer).getContext('2d');
};


export default {
  layerPreview,
  layerPseudo,
  drawEvent,
  canvas,
  ctx
};
