import { useEffect, useRef } from "react";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../../../game/world/world.constant";
import type { BattleAnimation, BattlePosition } from "../BattleScreen";
import { drawElectricArc } from "../../../rendering/entities/drawDepthSortedWorld";

type BattleEffectsCanvasProps = {
  position: BattlePosition;
  activeBattleAnimation: BattleAnimation;
  handleActiveAnimationComplete: () => void;
};

export default function BattleEffectsCanvas({
  position,
  activeBattleAnimation,
  handleActiveAnimationComplete,
}: BattleEffectsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!activeBattleAnimation) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    let startTime: number | null = null;
    const duration = 1200;

    const render = (timeStamp: number) => {
      if (startTime === null) {
        startTime = timeStamp;
      }

      const elapsed = timeStamp - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (elapsed >= duration) {
        handleActiveAnimationComplete();
        return;
      }

      if (activeBattleAnimation === "electricArc") {
        drawElectricArc(ctx, position, { x: 1100, y: 290 });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeBattleAnimation]);

  return (
    <canvas
      ref={canvasRef}
      width={WORLD_WIDTH}
      height={WORLD_HEIGHT}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}
