/*
  e (絵)
  copyright (c) 2022 sporeball
  MIT license
*/

import Event from './src/event.js';
import UI from './src/ui.js';

// state
const layer = 1;
const color = '#333333';

const click = false;
const erasing = false;
const focus = false;
const previewEnabled = true;

let curX, curY;
let prevX, prevY;

// initialization...
Event.init(); // core events
UI.init(); // other events

// should be good to go

export default {
  layer,
  color,
  click,
  erasing,
  focus,
  previewEnabled,
  curX,
  curY,
  prevX,
  prevY
};
