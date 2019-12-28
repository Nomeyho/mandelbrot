const NUMBER_ITERATIONS = 100;
const THRESHOLD = 5;

/**
 * Check if a given point C = (x, y) = x + iy belongs to the Mandelbrot set.
 * - iterativery compute Z = Z^2 + C given the initial value Z = 0
 * - check if |Z| exceeds a given threshold after N iterations (escape radius)
 * @param {number} x
 * @param {number} y
 * @return a number in range [0, 100] that represent how fast the series diverges.
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
      return i / NUMBER_ITERATIONS * 100;
    }
  }

  return 0;
}
