import { canvas } from './constants.js';
/*
 CX @ Origin X  
 CY @ Origin Y
 X  @ Point X to be rotated
 Y  @ Point Y to be rotated  
 anticlock_wise @ to rotate point in clockwise direction or anticlockwise , default clockwise 
 return @ {x,y}  
*/
export function rotate(
  originX,
  originY,
  targetX,
  targetY,
  angle,
  anticlock_wise = false
) {
  let radians, cos, sin, nx, ny;
  if (angle == 0) {
    return { x: parseFloat(targetX), y: parseFloat(targetY) };
  }
  if (anticlock_wise) {
    radians = (Math.PI / 180) * angle;
  } else {
    radians = (Math.PI / -180) * angle;
  }
  cos = Math.cos(radians);
  sin = Math.sin(radians);
  nx = cos * (targetX - originX) + sin * (targetY - originY) + originX;
  ny = cos * (targetY - originY) - sin * (targetX - originX) + originY;
  return { x: nx, y: ny };
}

export function randomScreenEdgeCoords(rad) {
  const coords = {
    x: 0,
    y: 0,
  };
  if (Math.random() < 0.5) {
    // fixed X, random Y
    coords.x = Math.random() < 0.5 ? 0 - rad : canvas.width + rad;
    coords.y = Math.random() * canvas.height;
  } else {
    // fixed Y, random X
    coords.y = Math.random() < 0.5 ? 0 - rad : canvas.height + rad;
    coords.x = Math.random() * canvas.width;
  }
  return coords;
}

export function randomCoords() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };
}
export function detectCollision(rect, circle) {
  var cx, cy;

  if (circle.x < rect.x) {
    cx = rect.x;
  } else if (circle.x > rect.x + rect.w) {
    cx = rect.x + rect.w;
  } else {
    cx = circle.x;
  }

  if (circle.y < rect.y) {
    cy = rect.y;
  } else if (circle.y > rect.y + rect.h) {
    cy = rect.y + rect.h;
  } else {
    cy = circle.y;
  }

  if (distance(circle.x, circle.y, cx, cy) < circle.r) {
    return true;
  }

  return false;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function radians_to_degrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

export function getWeightMap(arr) {
  return [...arr.map((t, i) => Array(t.weight).fill(i))]
    .join()
    .split(',')
    .map((a) => parseInt(a));
}
