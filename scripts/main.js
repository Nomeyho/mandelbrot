/**
 * Main file
 */
const zoom = new Zoom();

function main() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  zoom.size(width, height);
  const d3Zoom = d3.zoom()
  .scaleExtent([1, 40])
  .translateExtent([[-100, -100], [width + 90, height + 100]])
  .on('zoom', () => {
    console.log('zoomed', d3.event.transform);
    const { x, y, k } = d3.event.transform;
    zoom.transform(x, y, k)
    main();
  });

  const canvas = d3.select('#canvas')
    // make it look pretty on retina display
    .attr('width', width * 2)
    .attr('height', height * 2)
    .style('width', `${width}px`)
    .style('height', `${height}px`)
    .call(d3Zoom);

  const ctx = canvas.node().getContext('2d');
  ctx.scale(2, 2);

  console.time('draw');
  draw(ctx, zoom);
  console.timeEnd('draw');
}

window.onload = main;
window.onresize = main;