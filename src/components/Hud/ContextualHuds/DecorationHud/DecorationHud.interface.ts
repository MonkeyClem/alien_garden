import type React from "react";
import type { GameAssets } from "../../../../assets/assetTypes";
import type { Decoration } from "../../../../game/decorations/decoration.type";
import type { Inventory } from "../../../../game/inventory/inventory.type";
import type { SetStateAction } from "react";
import type { Ressources } from "../../../../game/type";
import type { UnlockedAbilities } from "../../../../game/abilities/abilities.type";

export default interface DecorationHudProps {
  decorationOnTile: Decoration;
  assets: GameAssets;
  inventory: Inventory;
  ressources: Ressources;
  bioBatteryStatus: "active" | "inactive";
  unlockedAbilities: UnlockedAbilities;
  setInventory: React.Dispatch<SetStateAction<Inventory>>;
  handleBioBatteryActivation: () => void;
}
