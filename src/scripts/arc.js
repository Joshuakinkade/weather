function height(radius,theta) {
  return radius * (1 - Math.cos(degTorad(theta)/2));
}

function width(height,radius) {
  return 2 * Math.sqrt((2 * radius * height) -( height * height));
}

function degTorad(deg) {
  return deg * Math.PI / 180;
}

const h = height(448,22.5);
console.log(h);

const w = width(h,512);
console.log(w);