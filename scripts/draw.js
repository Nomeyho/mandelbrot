/**
 * Paint the Mandelbrot set on the canvas
 */
function draw(ctx, zoom) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const dx = (zoom.xMax - zoom.xMin) / width;
  const dy = (zoom.yMax - zoom.yMin) / height;

  const img = ctx.getImageData(0, 0, width, height);
  let offset = 0; // sequential acces to image data

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const x = zoom.xMin + i * dx;
      const y = zoom.yMin + j * dy;

      const l = belongsToMandelbrotSet(x, y);
      const rgb = color(l);

      if (l == 0) {
        // rgba
        img.data[offset++] = 0;
        img.data[offset++] = 0;
        img.data[offset++] = 0;
        img.data[offset++] = 255;
      } else {
        // rgba
        img.data[offset++] = rgb[0];
        img.data[offset++] = rgb[1];
        img.data[offset++] = rgb[2];
        img.data[offset++] = 255;
      }
    }
  }

  ctx.putImageData(img, 0, 0);
}

/**
 * Simplified HSL to RGB converter.
 * @param {number} l the luminosity, in range [0-1]
 */
function color(l) {
  const q = l < 0.5 ? l * 2 : 1;
  const p = 2 * l - q;
  return [q * 255, p * 255, p * 255];
}
