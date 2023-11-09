export const useWebGL = (example) => {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  const onResize = ([entry]) => {
    canvas.width = entry.contentRect.width;
    canvas.height = entry.contentRect.height;
  };

  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(canvas);

  let rafID = 0;
  let current = Date.now(), deltaTime = 0, elapsedTime = 0;

  const render = () => {
    window.cancelAnimationFrame(rafID);
    rafID = window.requestAnimationFrame(render);
    deltaTime = Date.now() - current;
    current = Date.now();
    elapsedTime += deltaTime;
    example?.update?.({ deltaTime, elapsedTime });
  };

  setTimeout(render, 0);

  const stop = () => {
    resizeObserver.disconnect();
    window.cancelAnimationFrame(rafID);
  }

  return {
    canvas,
    gl,
    stop,
  };
};
