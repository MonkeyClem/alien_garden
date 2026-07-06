  export default function drawBackground(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ){

    ctx.fillStyle = "#0b001d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

  };