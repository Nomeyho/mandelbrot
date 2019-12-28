/**
 * Main file
 */
function main() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Make it look pretty on retina display
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(1, 1);

  const zoom = {
    xMin: -2,
    xMax: 2,
    yMin: -2,
    yMax: 2,
  };

  console.time('draw');
  draw(ctx, zoom);
  console.timeEnd('draw');
}

window.onload = main;
window.onresize = main;
