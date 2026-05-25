  export const drawTile = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    HALF_TILE_WIDTH: number,
    HALF_TILE_HEIGHT: number,
    isSelected: boolean,
  ) => {
    const top = {
      x: centerX,
      y: centerY - HALF_TILE_HEIGHT,
    };

    const right = {
      x: centerX + HALF_TILE_WIDTH,
      y: centerY,
    };

    const bottom = {
      x: centerX,
      y: centerY + HALF_TILE_HEIGHT,
    };

    const left = {
      x: centerX - HALF_TILE_WIDTH,
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
