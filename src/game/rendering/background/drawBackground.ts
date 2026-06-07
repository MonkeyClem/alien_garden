// import backgroundSrc from "../../../assets/PNG/Background/background.png";

  
  export default function drawBackground(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ){

//     const background = new Image();
// background.src = backgroundSrc;
    ctx.fillStyle = "#0b001d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //   if (!background.complete) return;

    // ctx.drawImage(
    //   background,
    //   0,
    //   0,
    //   canvas.width,
    //   canvas.height
    // )
  };