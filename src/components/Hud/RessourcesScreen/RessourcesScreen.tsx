import type { AssetsKey } from "../../../assets/assetTypes";
import type { RessourcesScreenProps } from "./RessourcesScreen.interface";
import styles from "./ressourcesScreen.module.css";
export default function RessourcesScreen({
  HUDContainerSize,
  assets,
  ressources,
}: RessourcesScreenProps) {
  const standardizeAssetKey = (assetKey: string) => {
    let newString = "";
    for (let i = 0; i < assetKey.length; i++) {
      if (assetKey[i].toUpperCase() === assetKey[i]) {
        newString += " ";
        newString += assetKey[i];
      } else {
        newString += assetKey[i].toUpperCase();
      }
    }
    return newString;
  };

  return (
    <div
      className={styles.ressourcesScreenContainer}
      style={{
        display: !HUDContainerSize ? "none" : "flex",
      }}
    >
      {Object.entries(ressources).map(([assetKey, value]) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <img
              src={assets[assetKey as AssetsKey].src}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                objectFit: "contain",
                imageRendering: "pixelated",
              }}
            />
            <p
              style={{
                color: "#76cee4",
              }}
            >
              {standardizeAssetKey(assetKey)} :{" "}
            </p>
            <p style={{ fontSize: 12 }}>{value}</p>
          </div>
        );
      })}
    </div>
  );
}
