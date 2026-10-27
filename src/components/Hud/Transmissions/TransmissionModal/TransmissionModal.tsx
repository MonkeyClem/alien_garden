import { useState } from "react";
import type { TransmissionModalInterface } from "./TransmissionModal.interface";

export default function TransmissionModal({
  assets,
  currentTransmission,
  setIsTransmissionModalOpen,
}: TransmissionModalInterface) {
  const [currentTransmissionIndex, setCurrentTransmissionIndex] = useState<number>(0);

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: 8,

        height: "40%",
        width: "75%",

        bottom: 0,
        right: 0,
        left: 0,
        justifySelf: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        background: "rgba(7,13,31,0.94)",
        border: "1px solid #087E98",

        zIndex: 10005,
        padding: 12,

        boxSizing: "border-box",

        pointerEvents: "auto",
      }}
    >
      <div
        // className={styles.transmissionModalHeaderContainer}
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #087E98",
        }}
      >
        <h4
          style={{
            color: "#89dcf1",
            padding: 6,
            margin: 0,
          }}
        >
          COLONIAL COMMUNICATION NETWORK
        </h4>
        <p style={{ color: "yellow", padding: 6, margin: 0 }}>CHN-407</p>
      </div>

      <div
        style={{ display: "flex", flex: 1 }}
        // className={styles.transmissionModalBodyContainer}
      >
        <img
          src={assets.transmissionOperator.src}
          style={{
            height: 160,
            width: 160,
            imageRendering: "pixelated",
          }}
        />
        <div
          // className={styles.transmissionModalBodyContainer}
          style={{
            paddingLeft: 8,
            paddingRight: 8,
            position: "relative",
            width: "100%",
          }}
        >
          <div
            //  className={styles.transmissionModalBodyHeader}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h3 style={{ color: "#89dcf1" }}>OPERATOR 07</h3>
            <p style={{ textTransform: "uppercase", color: "#3ab9d8", fontSize: 10 }}>
              link active
            </p>
          </div>
          <div
            //  className={styles.transmissionModalBodyMain}
            style={{ textAlign: "left", lineHeight: 1.6, fontSize: 16 }}
          >
            <p style={{ whiteSpace: "pre-line" }}>
              {currentTransmission.texts[currentTransmissionIndex] &&
                currentTransmission.texts[currentTransmissionIndex]}
            </p>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 8,
              alignSelf: "center",
              justifySelf: "flex-end",
            }}
          >
            {currentTransmission.texts[currentTransmissionIndex] && (
              <button
                style={{
                  cursor: "pointer",
                  color: "#89dcf1",
                  background: "rgba(7,13,31,0.94)",
                  // border: "1px solid #087E98",
                  border: "1px solid #89dcf1",
                  padding: "0.5rem",
                  borderRadius: 5,
                }}
                onClick={() => {
                  if (currentTransmissionIndex === currentTransmission.texts.length - 1) {
                    setIsTransmissionModalOpen(false);
                  } else setCurrentTransmissionIndex(currentTransmissionIndex + 1);
                }}
              >
                CONTINUER {">"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>VOLUME ICONE</p>
        <p>SECURE TRANSMISSION // ENCRYPTED</p>
      </div>
    </div>
  );
}
