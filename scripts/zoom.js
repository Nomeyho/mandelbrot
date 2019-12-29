class Zoom {
  center = [0, 0]; // units
  scale = 1;

  getExtent() {
    const extent = 2 / this.scale;
    return {
      xMin: this.center[0] - extent,
      xMax: this.center[0] + extent,
      yMin: this.center[1] - extent,
      yMax: this.center[1] + extent
    };
  }

  _setScale(factor) {
    this.scale = this.scale * Math.pow(100, factor);

    // prevent de-zoom & reset to default values
    if(this.scale <= 1) {
      this.scale = 1;
      this.center = [0, 0];
    }
  }

  _setCenter(x, y) {
    // convert px to units & center
    const cx = zoom.center[0] + (x - window.innerWidth / 2) * (2 / (window.innerWidth * this.scale));
    const cy = zoom.center[1] + (y - window.innerHeight / 2) * (2 / (window.innerHeight * this.scale));
    this.center = [cx, cy];
  }

  onwheel = (event) => {
    const { clientX, clientY, deltaY, deltaMode } = event;
  
    this._setCenter(clientX, clientY);
    // normalize scale accross browsers
    const factor = -deltaY * (deltaMode === 1 ? 0.05 : deltaMode ? 1 : 0.002); 
    this._setScale(factor);
  };
}
