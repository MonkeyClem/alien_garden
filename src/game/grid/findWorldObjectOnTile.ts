import type { Decoration } from "../decorations/decoration.type";
import { findDecorationOnTile } from "../decorations/findDecorationOnTile";
import { findPlantOnTile } from "../plants/findPlantOnTile";
import type { Plant } from "../plants/plants.type";

type WorldObjectOnTile =
  | {
      type: "plant";
      object: Plant;
    }
  | {
      type: "decoration";
      object: Decoration;
    };

export const findWorldObjectOnTile = (
  tileId: number,
  plants: Plant[],
  initialDecorations: Decoration[],
): WorldObjectOnTile | null => {
  const decoration = findDecorationOnTile(tileId, initialDecorations);

  if (decoration) {
    return {
      type: "decoration",
      object: decoration,
    };
  }



  const plant = findPlantOnTile(tileId, plants);

  if (plant) {
    return {
      type: "plant",
      object: plant,
    };
  }

  return null;
};
