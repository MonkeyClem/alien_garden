import type React from "react";
import type { GameAssets } from "../../../../assets/assetTypes";
import type { Decoration } from "../../../../game/decorations/decoration.type";
import type { Inventory } from "../../../../game/inventory/inventory.type";
import type { RefObject, SetStateAction } from "react";
import type { BioBatteryStatus, Player, Ressources } from "../../../../game/type";
import type { UnlockedAbilities } from "../../../../game/abilities/abilities.type";
import type { BioBatteryAnimationSequence } from "../../../../App";
import type { Tile } from "../../../../game/grid/tiles.types";

export default interface DecorationHudProps {
  decorationOnTile: Decoration;
  assets: GameAssets;
  inventory: Inventory;
  ressources: Ressources;
  bioBatteryStatus: "active" | "inactive";
  unlockedAbilities: UnlockedAbilities;
  player: React.RefObject<Player>;
  tiles: Tile[];
  bioBatteryAnimationSequence: RefObject<BioBatteryAnimationSequence>;
  setInventory: React.Dispatch<SetStateAction<Inventory>>;
  handleBioBatteryActivation: (
    player: Player,
    bioBatteryAnimationSequenceRef: RefObject<BioBatteryAnimationSequence>,
    bioBatteryStatus: BioBatteryStatus,
    unlockedAbilities: UnlockedAbilities,
    ressources: Ressources,
    tiles: Tile[],
  ) => void;
}
