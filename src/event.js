/*
  event.js
  e core event listeners
  copyright (c) 2022 sporeball
  MIT license
*/

import e from '../e.js';
import Canvas from './canvas.js';
import UI from './ui.js';

/**
 * register event listeners
 * @public
 */
const init = () => {
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
};

/**
 * mouse events
 */
const pointerdown = evt => {
  e.click = true;
  Canvas.drawEvent(evt);
};

const pointermove = evt => {
  if (e.click) {
    Canvas.drawEvent(evt, true);
  }
};

const pointerup = evt => {
  e.click = false;
  UI.updatePreview();
};

/**
 * keyboard events
 */
const keydown = evt => {
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
      UI.updateLayer();
      UI.updatePreview();
      break;
    // toggle eraser
    case 'e':
      e.erasing = !(e.erasing);
      UI.updateEraser();
      break;
    // focus mode
    case 'f':
      e.focus = !(e.focus);
      UI.toggleFocusMode();
      break;
  }
};

export default {
  init
};
