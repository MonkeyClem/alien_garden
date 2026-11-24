interface FighterHealthBarProps {
  healthPoint: number;
  maxHealthPoint: number;
}

export default function FighterHealthBar({
  healthPoint,
  maxHealthPoint,
}: FighterHealthBarProps) {
  const referenceMaxHP = healthPoint;
  const barWidth = Math.min((maxHealthPoint / referenceMaxHP) * 100, 100);

  const healthPercentage = Math.max(
    0,
    Math.min(maxHealthPoint / referenceMaxHP) * 100,
    100,
  );

  return (
    <div
      style={{
        height: 15,
        border: "2px solid pink",
        width: `${barWidth}%`,
        display: "flex",
      }}
    >
      <div
        style={{
          height: 15,
          width: `${healthPercentage}%`,
          background: "red",
        }}
      />
    </div>
  );
}
