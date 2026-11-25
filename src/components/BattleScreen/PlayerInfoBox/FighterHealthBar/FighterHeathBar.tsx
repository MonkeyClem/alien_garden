interface FighterHealthBarProps {
  healthPoint: number;
  maxHealthPoint: number;
}

const defineHealthBarColor = (healthPoint: number): string => {
  if (healthPoint >= 75) {
    return "green";
  } else if (healthPoint >= 50 && healthPoint < 75) {
    return "orange";
  } else if (healthPoint >= 25 && healthPoint < 50) {
    return "yellow";
  } else return "red";
};
export default function FighterHealthBar({
  healthPoint,
  maxHealthPoint,
}: FighterHealthBarProps) {
  const referenceMaxHP = healthPoint;

  const barWidth = Math.min((maxHealthPoint / referenceMaxHP) * 100, 100);

  const healthPercentage = Math.max(
    0,
    Math.min(100, (healthPoint / maxHealthPoint) * 100),
  );

  const barColor = defineHealthBarColor(healthPercentage);

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
          background: `${barColor}`,
          transition: "width 700ms ease-out",
        }}
      />
    </div>
  );
}
