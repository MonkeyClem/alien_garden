import type { Tile } from "../grid/tiles.types";
import type { PathNode } from "../type";
import getHeuristic from "./getHeuristic";
import getWalkableNeighbors from "./getWalkableNeighbors";

const getParentNode = (finalNode: PathNode, startTile: Tile): Tile[] => {
  let parentTile: PathNode = finalNode;
  const wayToFirstNodeNotReversed: Tile[] = [];

  if (finalNode.tileOnPath.id === startTile.id || parentTile.reachedFromNode === null) {
    return wayToFirstNodeNotReversed;
  }

  //On ajoutera le originNode à l'indice 0 après le while

  while (parentTile.reachedFromNode !== null) {
    wayToFirstNodeNotReversed.push(parentTile.tileOnPath);
    parentTile = parentTile.reachedFromNode;
  }
  wayToFirstNodeNotReversed.push(startTile);

  return wayToFirstNodeNotReversed.reverse();
};

export default function findPlayerPath(
  startTile: Tile,
  destinationTile: Tile,
  tiles: Tile[],
  occupiedTileIds: Set<number>,
): Tile[] {
  const firstPathNodeHeuristic = getHeuristic(
    destinationTile.gridX,
    destinationTile.gridY,
    startTile.gridX,
    startTile.gridY,
  );

  const firstPathode: PathNode = {
    costOfPath: 0,
    heuristic: firstPathNodeHeuristic,
    reachedFromNode: null,
    tileOnPath: startTile,
    totalCost: firstPathNodeHeuristic, //Similaire à l'heuristique pour le premier, car g (le cout total du chemin) est automatiquement à 0
  };

  const openSet: Set<PathNode> = new Set();
  const closedSet: Set<PathNode> = new Set();

  openSet.add(firstPathode);

  let nodeToReturn: PathNode | null = null;

  while (openSet.size > 0) {
    let actualCheaperCostNode: PathNode | null = null;

    for (const node of openSet) {
      // Trouver le nœud avec le plus petit f
      if (
        actualCheaperCostNode === null ||
        node.totalCost < actualCheaperCostNode.totalCost
      ) {
        actualCheaperCostNode = node;
      }
    }

    if (
      actualCheaperCostNode !== null &&
      actualCheaperCostNode.tileOnPath.id === destinationTile.id
    ) {
      nodeToReturn = actualCheaperCostNode;
      break;
    }

    // Examiner le nœud sélectionné
    if (actualCheaperCostNode !== null) {
      // Explorer ses voisins
      const walkableNeighbors = getWalkableNeighbors(
        actualCheaperCostNode.tileOnPath.gridX,
        actualCheaperCostNode.tileOnPath.gridY,
        tiles,
        occupiedTileIds,
      );

      // Pour chaque neighborTile, tu dois :
      for (const neighborTile of walkableNeighbors) {
        // 1. Calculer son nouveau coût g depuis actualCheaperCostNode.
        const updatedCostOfPath = actualCheaperCostNode.costOfPath + 1;
        const newNodeHeuristic = getHeuristic(
          neighborTile.gridX,
          neighborTile.gridY,
          destinationTile.gridX,
          destinationTile.gridY,
        );
        const newNode: PathNode = {
          costOfPath: updatedCostOfPath,
          heuristic: newNodeHeuristic,
          reachedFromNode: actualCheaperCostNode,
          tileOnPath: neighborTile,
          totalCost: newNodeHeuristic + updatedCostOfPath,
        };

        // 2. Vérifier si cette tuile correspond à un nœud déjà présent dans le closedSet.
        // Si c'est le cas, on ignore
        const isAlreadyClosed = [...closedSet].some(
          newNode => newNode.tileOnPath.id === neighborTile.id,
        );

        const existingOpenNode = [...openSet].find(
          node => node.tileOnPath.id === neighborTile.id,
        );

        if (isAlreadyClosed) continue;

        if (existingOpenNode === undefined) {
          // Le voisin n'a jamais été découvert
          // Ajouter newNode à openSet
          openSet.add(newNode);
        } else {
          // Le voisin possède déjà un PathNode
          // Comparer son g avec updatedCostOfPath
          if (existingOpenNode.costOfPath > updatedCostOfPath) {
            openSet.delete(existingOpenNode);
            openSet.add(newNode);
          }
        }
      }
    }

    // Mettre à jour les ensembles
    if (actualCheaperCostNode !== null) {
      openSet.delete(actualCheaperCostNode);
      closedSet.add(actualCheaperCostNode);
    }

    if (!actualCheaperCostNode) return [firstPathode.tileOnPath];
  }
  if (nodeToReturn !== null) return getParentNode(nodeToReturn, startTile);
  return [firstPathode.tileOnPath];
}
