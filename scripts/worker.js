const NUMBER_ITERATIONS = 100;
const THRESHOLD = 5;

onmessage = function(e) {
  console.log('[WORKER] Received', e.data);
  const { width, height, xMin, xMax, yMin, yMax } = e.data;
  const image = draw(width, height, xMin, xMax, yMin, yMax);
  postMessage(image.buffer, [image.buffer]);
};

/**
 * Deaw the Mandelbrot set
 * @param {*} width the canvas width in px
 * @param {*} height the canvas height in px
 * @param {*} xMin left boundary
 * @param {*} xMax right boundary
 * @param {*} yMin top boundary
 * @param {*} yMax bottom boundary
 * @returns the image data as an Uint8 array
 * (offscreen canvas are not supported on every browsers)
 */
function draw(width, height, xMin, xMax, yMin, yMax) {
    console.log('Computing fractal:', { xMin, xMax, yMin, yMax });
    const dx = (xMax - xMin) / width;
    const dy = (yMax - yMin) / height;
    const image = new Uint8ClampedArray(width * height * 4);
    let offset = 0; // sequential acces to image data
  
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        const x = xMin + i * dx;
        const y = yMin + j * dy;
  
        const l = belongsToMandelbrotSet(x, y);
        const rgb = color(l);
  
        if (l == 0) {
          // rgba
          image[offset++] = 0;
          image[offset++] = 0;
          image[offset++] = 0;
          image[offset++] = 255;
        } else {
          // rgba
          image[offset++] = rgb[0];
          image[offset++] = rgb[1];
          image[offset++] = rgb[2];
          image[offset++] = 255;
        }
      }
    }
  
    return image;
  }

/**
 * Check if a given point C = (x, y) = x + iy belongs to the Mandelbrot set.
 * - iterativery compute Z = Z^2 + C given the initial value Z = 0
 * - check if |Z| exceeds a given threshold after N iterations (escape radius)
 * @param {number} x
 * @param {number} y
 * @return a number in range [0, 1] that represent how fast the series diverges.
 * The higher the return value, the faster it diverges. Returns 0 for convergent series.
 */
function belongsToMandelbrotSet(x, y) {
    // Z_1 = C
    let X = x;
    let Y = y;
  
    for (let i = 0; i < NUMBER_ITERATIONS; ++i) {
      // Z^2 = (x + iy)^2 = x^2 - y^2 + 2ixy
      let tempX = X * X - Y * Y + x;
      let tempY = 2 * X * Y + y;
      X = tempX;
      Y = tempY;
  
      if((X * Y) > THRESHOLD) { // not strictly correct, but it speeds up the computation
        return i / NUMBER_ITERATIONS;
      }
    }
  
    return 0;
  }  
  
  /**
   * Simplified HSL to RGB converter.
   * @param {number} l the luminosity, in range [0-1]
   * @returns {Array<number>} RGB array
   */
  function color(l) {
    const q = l < 0.5 ? l * 2 : 1;
    const p = 2 * l - q;
    return [q * 255, p * 255, p * 255];
  }
