/**
 * Main file
 */
const zoom = new Zoom();
const worker = new Worker('scripts/worker.js');
function main() {
  const width = window.innerWidth * 2; // retina display
  const height = window.innerHeight * 2;
  
  const canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width / 2}px`;
  canvas.style.height = `${height / 2}px`;

  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  console.time('draw');
  const { xMin, xMax, yMin, yMax } = zoom.getExtent();
  worker.postMessage({ width, height, xMin, xMax, yMin, yMax });
  worker.onmessage = (e) => {
    const array = new Uint8ClampedArray(e.data);
    const imageData = new ImageData(array, width, height);
    ctx.putImageData(imageData, 0, 0);
    console.timeEnd('draw');
  }
}

window.onload = main;
window.onresize = main;
document.onwheel = (event) => {
  event.preventDefault();
  zoom.onwheel(event);
  main();
};
