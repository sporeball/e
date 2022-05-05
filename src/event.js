/*
  event.js
  e core event listeners
  copyright (c) 2022 sporeball
  MIT license
*/

import e from '../e.js';
import Canvas from './canvas.js';
import IO from './io.js';
import UI from './ui.js';

/**
 * register event listeners
 * @public
 */
function init () {
  Canvas.layerPseudo.addEventListener('pointerdown', pointerdown);
  Canvas.layerPseudo.addEventListener('pointermove', pointermove);
  Canvas.layerPseudo.addEventListener('pointerup', pointerup);
  Canvas.layerPseudo.addEventListener('pointerout', pointerup); // do the same thing

  document.addEventListener('keydown', keydown);

  // prompt before exiting...
  window.addEventListener('beforeunload', evt => {
    evt.preventDefault(); // ...in Firefox
    evt.returnValue = ''; // ...in Chrome
  });
}

/**
 * mouse events
 */
function pointerdown (evt) {
  e.click = true;
  Canvas.drawEvent(evt);
}

function pointermove (evt) {
  if (e.click) {
    Canvas.drawEvent(evt, true);
  }
}

function pointerup (evt) {
  e.click = false;
  UI.updateLayerPreview();
}

/**
 * keyboard events
 */
function keydown (evt) {
  if (e.click) {
    return;
  }
  switch (evt.key) {
    // switch current layer
    case '1':
    case '2':
    case '3':
    case '4':
      e.layer = Number(evt.key);
      UI.updateLayerText();
      UI.updateLayerPreview();
      break;
    // toggle eraser
    case 'e':
      e.erasing = !(e.erasing);
      UI.updateEraserText();
      break;
    // focus mode
    case 'f':
      e.focus = !(e.focus);
      UI.toggleFocusMode();
      break;
    // toggle layer preview
    case 'p':
      e.previewEnabled = !(e.previewEnabled);
      UI.toggleLayerPreview();
      break;
    case 's':
      if (evt.ctrlKey) {
        evt.preventDefault();
        IO.save();
      }
      break;
  }
}

export default {
  init
};
