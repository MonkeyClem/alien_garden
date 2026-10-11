import type DecorationHudProps from "./DecorationHud.interface";
import styles from "./decoration.module.css";

export default function DecorationHud({ decorationOnTile, assets }: DecorationHudProps) {
  return (
    <div className={styles.decorationHudFlexContainer}>
      <div className={styles.decorationHudTextZone}>
        <h3 className={styles.decorationHudDisplayName}>
          {decorationOnTile.displayName}
        </h3>
        <p>{decorationOnTile.description}</p>
      </div>

      <div>
        <img
          src={assets[decorationOnTile.assetKey].src}
          className={styles.decorationHudImg}
        />
      </div>
    </div>
  );
}
