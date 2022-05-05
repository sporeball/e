/*
  io.js
  e saving and loading code
  copyright (c) 2022 sporeball
  MIT license
*/

import Canvas from './canvas.js';

async function save() {
  const ctx = Canvas.layerComposite.getContext('2d');

  // clear the composite layer
  Canvas.layerComposite.width = 400;
  // draw the numbered layers one at a time
  ctx.drawImage(Canvas.getCanvas(4), 0, 0, 400, 400);
  ctx.drawImage(Canvas.getCanvas(3), 0, 0, 400, 400);
  ctx.drawImage(Canvas.getCanvas(2), 0, 0, 400, 400);
  ctx.drawImage(Canvas.getCanvas(1), 0, 0, 400, 400);
  // save
  const a = document.createElement('a');
  a.setAttribute('download', 'export.png');
  a.setAttribute('href', Canvas.layerComposite.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
  a.click();
  a.remove();
}

export default {
  save
}
