class Zoom {
  // canvas dimensions
  width;
  height;
  // zoom
  center = [0, 0];
  scale = 1;

  size(width, height) {
    this.width = width;
    this.height = height;
  }

  getExtent() {
    const extent = 2 / this.scale;
    const dx = extent / this.width;
    const dy = extent / this.height;
    const c = [this.center[0] * dx, this.center[1] * dy];

    return {
      xMin: c[0] - extent,
      xMax: c[0] + extent,
      yMin: c[1] - extent,
      yMax: c[1] + extent
    };
  }

  transform(x, y, k) {
    this.center[0] = -x;
    this.center[1] = -y;
    this.scale = k;
  }
}
