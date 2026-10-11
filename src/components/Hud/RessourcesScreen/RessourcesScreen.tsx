import type { GameAssets } from "../../../assets/assetTypes";
import type { Ressources } from "../../../game/type";
import type { Viewport } from "../../../rendering/viewport/viewport.type";

export interface RessourcesScreenProps {
  HUDContainerSize: Viewport | null;
  assets: GameAssets;
  ressources: Ressources;
}

export default function RessourcesScreen({
  HUDContainerSize,
  assets,
  ressources,
}: RessourcesScreenProps) {
  return (
    <div
      style={{
        flexDirection: "column",
        gap: "5vh",
        alignItems: "flex-start",
        borderRadius: "10px",
        display: !HUDContainerSize ? "none" : "flex",
        justifyContent: "space-between",
        fontSize: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          background: "rgba(7, 13, 31, 0.94)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignContent: "baseline",
            background: "rgba(7, 13, 31, 0.94)",
            border: "2px solid #087E9B",
            padding: "0.25rem",
            borderRadius: "10px",
          }}
        >
          <img
            src={assets.bioMass.src}
            style={{
              width: "48px",
              height: "48px",
              objectFit: "cover",
              imageRendering: "pixelated",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: 8,
              paddingRight: 8,
              textAlign: "left",
            }}
          >
            <p> Biomass</p>
            <p> {ressources.bioMass}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            background: "rgba(7, 13, 31, 0.94)",
            border: "2px solid #087E9B",
            borderRadius: "10px",
            alignContent: "baseline",
            padding: "0.25rem",
          }}
        >
          <img
            src={assets.bioEnergy.src}
            style={{
              width: "48",
              height: "48px",
              objectFit: "cover",
              imageRendering: "pixelated",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: 8,
              paddingRight: 8,
              textAlign: "left",
            }}
          >
            <p> BioEnergie</p>
            <p>{ressources.bioEnergy}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            background: "rgba(7, 13, 31, 0.94)",
            border: "2px solid #087E9B",
            borderRadius: "10px",
            alignContent: "baseline",
            padding: "0.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <img
              src={assets.biologicalData.src}
              style={{
                width: "48px",
                height: "48px",
                objectFit: "contain",
                imageRendering: "pixelated",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <p> Données </p>
              <p> {ressources.biologicalData}</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
