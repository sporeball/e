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
  Canvas.canvas.addEventListener('mousedown', mousedown);
  Canvas.canvas.addEventListener('mousemove', mousemove);
  Canvas.canvas.addEventListener('mouseup', mouseup);
  Canvas.canvas.addEventListener('mouseout', mouseup); // do the same thing

  document.addEventListener('keydown', keydown);

  // prompt before exiting...
  window.addEventListener('beforeunload', evt => {
    evt.preventDefault(); // ...in Firefox
    evt.returnValue = ''; // ...in Chrome
  });
};

// browser events here
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

const keydown = evt => {
  switch (evt.key) {
    case 'e':
      e.erasing = !(e.erasing);
      UI.updateEraser();
      break;
  }
};

export default {
  init
};
