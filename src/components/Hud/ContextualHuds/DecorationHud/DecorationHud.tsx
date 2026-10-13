import refillReactorMushroomSeeds from "../../../../game/inventory/refillReactorMushroomSeeds";
import { SPECIES_CONFIG } from "../../../../game/plants/speciesConfig";
import type DecorationHudProps from "./DecorationHud.interface";
import styles from "./decoration.module.css";

export default function DecorationHud({
  decorationOnTile,
  assets,
  inventory,
  setInventory,
}: DecorationHudProps) {
  return (
    <div className={styles.decorationHudFlexContainer}>
      <div style={{ display: "flex" }}>
        <div className={styles.decorationHudTextZone}>
          <img
            src={assets[decorationOnTile.assetKey].src}
            className={styles.decorationHudImg}
          />
        </div>

        <div>
          <h3 className={styles.decorationHudDisplayName}>
            {decorationOnTile.displayName}
          </h3>
          <p>{decorationOnTile.description}</p>
        </div>
      </div>
      <hr style={{ width: "100%" }} />

      {decorationOnTile.assetKey === "spacePod" && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 0,
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <h3 style={{ padding: 0, color: "#76cee4" }}>Réserve de spores</h3>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <p>{SPECIES_CONFIG.reactorMushroom.displayName}</p>
              <p>Stock : {inventory.species.reactorMushroom}</p>
              <button
                style={{
                  background: "#087E9B",
                  border: "none",
                  padding: 4,
                  borderRadius: 5,
                }}
                disabled={inventory.species.reactorMushroom === 3}
                onClick={() => {
                  setInventory(previousInventory =>
                    refillReactorMushroomSeeds(previousInventory),
                  );
                }}
              >
                Réapprovisionner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
