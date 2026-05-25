  export const drawTile = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    halfWidth: number,
    halfHeight: number,
    isSelected: boolean,
  ) => {
    const top = {
      x: centerX,
      y: centerY - halfHeight,
    };

    const right = {
      x: centerX + halfWidth,
      y: centerY,
    };

    const bottom = {
      x: centerX,
      y: centerY + halfHeight,
    };

    const left = {
      x: centerX - halfWidth,
      y: centerY,
    };

    ctx.beginPath();
    ctx.moveTo(top.x, top.y);
    ctx.lineTo(right.x, right.y);
    ctx.lineTo(bottom.x, bottom.y);
    ctx.lineTo(left.x, left.y);
    ctx.closePath();

    ctx.fillStyle = isSelected ? "#fb2ad8" : "#520445";
    ctx.fill();

    ctx.strokeStyle = isSelected ? "cyan" : "white";
    ctx.stroke();
  };
