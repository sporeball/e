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
  Canvas.layerPseudo.addEventListener('mousedown', mousedown);
  Canvas.layerPseudo.addEventListener('mousemove', mousemove);
  Canvas.layerPseudo.addEventListener('mouseup', mouseup);
  Canvas.layerPseudo.addEventListener('mouseout', mouseup); // do the same thing

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
const mousedown = evt => {
  e.click = true;
  Canvas.drawEvent(evt);
};

const mousemove = evt => {
  if (e.click) {
    Canvas.drawEvent(evt, true);
  }
};

const mouseup = evt => {
  e.click = false;
};

/**
 * keyboard events
 */
const keydown = evt => {
  switch (evt.key) {
    // switch current layer
    case '1':
    case '2':
    case '3':
    case '4':
      e.layer = Number(evt.key);
      UI.updateLayer();
      break;
    // toggle eraser
    case 'e':
      e.erasing = !(e.erasing);
      UI.updateEraser();
      break;
  }
};

export default {
  init
};
