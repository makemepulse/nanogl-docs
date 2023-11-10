export const useWebGL = (canvasEl) => {
  let rafID = null;
  let current = Date.now(), deltaTime = 0, elapsedTime = 0;

  const size = {
    width: 1,
    height: 1
  };
  const pixelRatio = window.devicePixelRatio;

  // --CANVAS & CONTEXT--

  const canvas = canvasEl || document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  const start = (update, isStatic = false) => {
    // --SIZING--

    const handleResize = (entries) => {
      // get canvas width & height
      const {
        width: canvasWidth,
        height: canvasHeight
      } = entries[0].contentRect;

      // set canvas size to display size multiplied by pixel ratio
      canvas.width = Math.round(canvasWidth * pixelRatio);
      canvas.height = Math.round(canvasHeight * pixelRatio);

      // set size variable to actual size of the current drawing buffer
      size.width = gl.drawingBufferWidth;
      size.height = gl.drawingBufferHeight;

      if (isStatic) render();
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // --RENDER--

    const render = () => {
      if (!isStatic) {
        window.cancelAnimationFrame(rafID);
        rafID = window.requestAnimationFrame(render);
        deltaTime = Date.now() - current;
        current = Date.now();
        elapsedTime += deltaTime;
      }
      update?.({ deltaTime, elapsedTime });
    };

    setTimeout(render, 0);

    // --STOP--

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(rafID);
    };
  }

  return {
    gl,
    canvas,
    size,
    start
  };
};
