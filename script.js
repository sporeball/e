/*
  e (絵)
  copyright (c) 2022 sporeball
  MIT license
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let drawing = false;

// drawing event
const draw = evt => {
  const rect = canvas.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const y = evt.clientY - rect.top;
  ctx.fillStyle = drawing ? '#333' : 'rgba(0, 0, 0, 0)';
  ctx.fillRect(x, y, 5, 5);
};

// browser events
document.onmousedown = evt => {
  drawing = true;
  draw(evt);
};

document.onmousemove = evt => {
  draw(evt);
};

document.onmouseup = evt => {
  drawing = false;
};
