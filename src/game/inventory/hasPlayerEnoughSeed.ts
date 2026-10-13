import type { Species } from "../plants/plants.type";
import type { Inventory } from "./inventory.type";

export default function hasPlayerEnoughSeeds(
  inventory: Inventory,
  selectedSpecies: Species,
): boolean {
  return Boolean(inventory.species[selectedSpecies] > 0);
}
