import type { Inventory } from "./inventory.type";


export default function refillReactorMushroomSeeds(inventory: Inventory): Inventory {
  const availableSpace = Math.max(inventory.species.reactorMushroom, 3);

  return {
    ...inventory,
    species: {
      ...inventory.species,
      reactorMushroom: availableSpace,
    },
  };
}
