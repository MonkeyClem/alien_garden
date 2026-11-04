//DISTANCE DE MANHATTAN
export default function getHeuristic(
  destinationGridX: number,
  destinationGridY: number,
  originGridX: number,
  originGridY: number,
) {
  const estimatedCostX = Math.abs(destinationGridX - originGridX);
  const estimatedCostY = Math.abs(destinationGridY - originGridY);

  const estimatedTotalCost = estimatedCostX + estimatedCostY;
  return estimatedTotalCost;
}
