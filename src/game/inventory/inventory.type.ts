import type { Species } from "../plants/plants.type";

export type Inventory = {
  species: Record<Species, number>;
};
