
  export default function drawBackground(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ){
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };