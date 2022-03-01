/*
  e (絵)
  copyright (c) 2022 sporeball
  MIT license
*/

import Event from './src/event.js';
import UI from './src/ui.js';

const color = '#333333';
const click = false;
const erasing = false;

let curX, curY;
let prevX, prevY;

Event.init(); // core events only
UI.init();

export default {
  color,
  click,
  erasing,
  curX,
  curY,
  prevX,
  prevY
};
