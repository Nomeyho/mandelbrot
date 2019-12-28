/**
 * Paint the Mandelbrot set on the canvas
 */
function draw(ctx, zoom) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const dx = (zoom.xMax - zoom.xMin) / width;
  const dy = (zoom.yMax - zoom.yMin) / height;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const x = zoom.xMin + i * dx;
      const y = zoom.yMin + j * dy;

      const l = belongsToMandelbrotSet(x, y);
    
      if (l == 0) {
        ctx.fillStyle = '#000';
      } else {
        ctx.fillStyle = `hsl(0, 100%, ${l}%)`;
      }

      ctx.fillRect(i, j, 1, 1);
    }
  }
}
