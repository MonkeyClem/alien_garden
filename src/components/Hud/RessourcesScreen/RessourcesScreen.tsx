import type { AssetsKey } from "../../../assets/assetTypes";
import type { RessourcesScreenProps } from "./RessourcesScreen.interface";

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
      style={{
        gap: "5vh",
        height: "fit-content",
        alignItems: "flex-start",
        borderRadius: "10px",
        display: !HUDContainerSize ? "none" : "flex",
        justifyContent: "space-between",
        fontSize: 14,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        background: "rgba(7, 13, 31, 0.94)",
        border: "2px solid #087E9B",
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
