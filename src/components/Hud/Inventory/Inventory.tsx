import { useState, type Dispatch } from "react";
import React from "react";
import type { Species } from "../../../game/plants/plants.type";
import type { Inventory } from "../../../game/type";

interface InventoryProps {
  inventory: Inventory;
  isInventoryOpen: boolean;
  unlockedSpecies: Species[];
  setIsInventoryOpen: Dispatch<React.SetStateAction<boolean>>;
  handleSeedSelection: (selectedSpecie: Species) => void;
}

export type MenuItemStatus = "locked" | "unlocked";
export type MenuItemName = "Seeds" | "Weapons" | "Ressources";
export type MenuItems = { name: MenuItemName; status: MenuItemStatus };

export default function InventoryComponents({
  inventory,
  isInventoryOpen,
  unlockedSpecies,
  handleSeedSelection,
  setIsInventoryOpen,
}: InventoryProps) {
  const menuItems: MenuItems[] = [
    { name: "Seeds", status: "unlocked" },
    { name: "Ressources", status: "locked" },
    { name: "Weapons", status: "locked" },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItems | null>(
    null,
  );


/* ───────────────────────── TOKENS ─────────────────────────── */
/* Palette biopunk : violet profond / cyan bio-lumineux / vert   */
/* organique en accent rare. Tout dérive de ces 8 valeurs.       */
 
const palette = {
  void: "#0B0714",
  panel: "#130D22",
  panelAlt: "#1C1330",
  border: "rgba(155, 92, 246, 0.28)",
  cyan: "#4EFFE0",
  cyanDim: "rgba(78, 255, 224, 0.12)",
  purple: "#9B5CF6",
  purpleDim: "rgba(155, 92, 246, 0.16)",
  green: "#7CFFB2",
  text: "#ECE7FA",
  textDim: "#8B7FA8",
  locked: "#342C4D",
  danger: "#FF5C7A",
};
 
const fontDisplay = "'Orbitron', 'Segoe UI', sans-serif";
const fontMono = "'JetBrains Mono', 'Fira Code', monospace";
 
/* Glyphes géométriques cycliques pour les catégories du menu,   */
/* évite la dépendance à une lib d'icônes externe.               */
const GLYPHS = ["⬡", "◈", "⌬", "▣", "✦", "◎"];


const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: "flex",
    flexDirection: "column",
    width: 720,
    maxWidth: "92vw",
    height: 480,
    background: `linear-gradient(160deg, ${palette.panel} 0%, ${palette.void} 100%)`,
    border: `1px solid ${palette.border}`,
    borderRadius: 6,
    boxShadow: `0 0 0 1px rgba(0,0,0,0.4), 0 12px 40px rgba(0,0,0,0.6), 0 0 30px ${palette.purpleDim}`,
    position: "relative",
    overflow: "hidden",
    fontFamily: fontMono,
    color: palette.text,
  },
 
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 18px 12px 20px",
  },
  headerTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  headerGlyph: {
    fontSize: 18,
    color: palette.cyan,
    textShadow: `0 0 8px ${palette.cyan}`,
  },
  headerTitle: {
    margin: 0,
    fontFamily: fontDisplay,
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: palette.text,
  },
  closeButton: {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: `1px solid ${palette.border}`,
    borderRadius: 4,
    color: palette.textDim,
    fontSize: 12,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
 
  headerDivider: {
    height: 1,
    margin: "0 20px",
    background: `linear-gradient(90deg, ${palette.cyan} 0%, ${palette.purple} 45%, transparent 100%)`,
    opacity: 0.5,
  },
 
  body: {
    display: "flex",
    flex: 1,
    minHeight: 0,
    gap: 0,
    padding: "16px 20px 20px 20px",
  },
 
  /* Sidebar */
  sidebar: {
    display: "flex",
    flexDirection: "column",
    flex: 2,
    gap: 6,
    paddingRight: 14,
    borderRight: `1px solid ${palette.border}`,
  },
  sidebarItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px 10px 16px",
    background: palette.panelAlt,
    border: `1px solid transparent`,
    borderRadius: 4,
    color: palette.textDim,
    fontFamily: fontMono,
    fontSize: 12,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s ease",
  },
  sidebarItemActive: {
    background: palette.purpleDim,
    borderColor: palette.purple,
    color: palette.text,
  },
  sidebarItemLocked: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  sidebarActiveBar: {
    position: "absolute",
    left: 0,
    top: 4,
    bottom: 4,
    width: 3,
    borderRadius: 2,
    background: palette.cyan,
    boxShadow: `0 0 8px ${palette.cyan}`,
    transition: "opacity 0.2s ease",
  },
  sidebarGlyph: {
    fontSize: 13,
    color: palette.cyan,
    width: 16,
    textAlign: "center",
  },
  sidebarLabel: {
    flex: 1,
  },
  lockIcon: {
    fontSize: 10,
    opacity: 0.7,
  },
 
  /* Content */
  content: {
    flex: 5,
    paddingLeft: 18,
    overflowY: "auto",
    position: "relative",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
    gap: 14,
  },
 
  /* Vial cards (specimens) */
  vialCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: "16px 8px 12px 8px",
    background: palette.panelAlt,
    border: `1px solid ${palette.border}`,
    borderRadius: 10,
    fontFamily: fontMono,
    cursor: "pointer",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },
  vialCardUnlocked: {
    animation: "bioGlowPulse 3.2s ease-in-out infinite",
  },
  vialCardLocked: {
    opacity: 0.45,
    cursor: "not-allowed",
    backgroundImage:
      "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 10px)",
  },
 
  vialCapsule: {
    width: 44,
    height: 56,
    borderRadius: "40% 40% 50% 50% / 30% 30% 60% 60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${palette.border}`,
  },
  vialCapsuleUnlocked: {
    background: `linear-gradient(180deg, ${palette.cyanDim} 0%, ${palette.green}22 100%)`,
    borderColor: palette.cyan,
  },
  vialCapsuleLocked: {
    background: palette.locked,
  },
  vialQuantity: {
    fontSize: 13,
    fontWeight: 700,
    color: palette.cyan,
    textShadow: `0 0 6px ${palette.cyan}`,
  },
  vialName: {
    fontSize: 10.5,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: palette.text,
    textAlign: "center",
  },
  vialLockedLabel: {
    fontSize: 9,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: palette.danger,
  },
 
  /* Empty state */
  emptyState: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    color: palette.textDim,
  },
  emptyGlyph: {
    fontSize: 26,
    color: palette.purple,
    opacity: 0.6,
  },
  emptyText: {
    fontSize: 11.5,
    letterSpacing: "0.04em",
  },
};
 

  return isInventoryOpen ? (
    <div>
      {/* <div style={{ justifyContent: "space-between" }}>
        <h3>Inventaire</h3>
        <button
          style={{ position: "absolute", top: 10, right: 5 }}
          onClick={() => setIsInventoryOpen(!isInventoryOpen)}
        >
          X
        </button>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
            background: "red",
          }}
        >
          {menuItems.map((item) =>
            item.status === "locked" ? (
              <button disabled>{item.name}</button>
            ) : (
              <button onClick={() => setSelectedMenuItem(item)}>
                {item.name}
              </button>
            ),
          )}
        </div>
        <div
          style={{ display: "flex", flex: 5, background: "#262525", gap: 12 }}
        >
          {selectedMenuItem?.name === "Seeds"
            ? Object.entries(inventory.species).map(([specie, quantity]) => (
                <div>
                  <button
                    disabled={!unlockedSpecies.includes(specie as Species)}
                    key={specie}
                    onClick={() => handleSeedSelection(specie as Species)}
                  >
                    {specie} : {quantity}
                  </button>
                </div>
              ))
            : null}
        </div>
      </div> */}

       <div style={styles.panel}>
      {/* Un seul bloc <style> pour ce que les style-objects ne     */}
      {/* peuvent pas faire : @import de polices, @keyframes,       */}
      {/* et la scrollbar custom. Toujours dans ce même fichier —   */}
      {/* pas de .css séparé.                                       */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
 
        @keyframes bioGlowPulse {
          0%, 100% {
            box-shadow: 0 0 8px rgba(78,255,224,0.22), inset 0 0 14px rgba(78,255,224,0.06);
          }
          50% {
            box-shadow: 0 0 18px rgba(78,255,224,0.45), inset 0 0 18px rgba(78,255,224,0.14);
          }
        }
 
        @keyframes scanlineDrift {
          0% { background-position: 0 0; }
          100% { background-position: 0 48px; }
        }
 
        .biopunk-scroll::-webkit-scrollbar { width: 8px; }
        .biopunk-scroll::-webkit-scrollbar-track { background: transparent; }
        .biopunk-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, ${palette.cyan}, ${palette.purple});
          border-radius: 4px;
        }
      `}</style>
 
      {/* ── HEADER ─────────────────────────────────────────── */}
      <div style={styles.header}>
        <div style={styles.headerTitleRow}>
          <span style={styles.headerGlyph}>⬡</span>
          <h3 style={styles.headerTitle}>Inventaire</h3>
        </div>
        <button
          style={styles.closeButton}
          onClick={() => setIsInventoryOpen(!isInventoryOpen)}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = palette.cyan;
            e.currentTarget.style.color = palette.cyan;
            e.currentTarget.style.boxShadow = `0 0 10px ${palette.cyanDim}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = palette.border;
            e.currentTarget.style.color = palette.textDim;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ✕
        </button>
      </div>
 
      <div style={styles.headerDivider} />
 
      {/* ── BODY ───────────────────────────────────────────── */}
      <div style={styles.body}>
        {/* -- Sidebar catégories -- */}
        <div style={styles.sidebar}>
          {menuItems.map((item, idx) => {
            const isActive = selectedMenuItem?.name === item.name;
            const isLocked = item.status === "locked";
            return (
              <button
                key={item.name}
                disabled={isLocked}
                onClick={() => setSelectedMenuItem(item)}
                style={{
                  ...styles.sidebarItem,
                  ...(isActive ? styles.sidebarItemActive : {}),
                  ...(isLocked ? styles.sidebarItemLocked : {}),
                }}
              >
                <span
                  style={{
                    ...styles.sidebarActiveBar,
                    opacity: isActive ? 1 : 0,
                  }}
                />
                <span style={styles.sidebarGlyph}>
                  {GLYPHS[idx % GLYPHS.length]}
                </span>
                <span style={styles.sidebarLabel}>{item.name}</span>
                {isLocked && <span style={styles.lockIcon}>🔒</span>}
              </button>
            );
          })}
        </div>
 
        {/* -- Contenu -- */}
        <div className="biopunk-scroll" style={styles.content}>
          {selectedMenuItem?.name === "Seeds" ? (
            <div style={styles.grid}>
              {Object.entries(inventory.species).map(([specie, quantity]) => {
                const unlocked = unlockedSpecies.includes(specie as Species);
                return (
                  <button
                    key={specie}
                    disabled={!unlocked}
                    onClick={() => handleSeedSelection(specie as Species)}
                    style={{
                      ...styles.vialCard,
                      ...(unlocked ? styles.vialCardUnlocked : styles.vialCardLocked),
                    }}
                    onMouseEnter={(e) => {
                      if (unlocked) e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      if (unlocked) e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        ...styles.vialCapsule,
                        ...(unlocked ? styles.vialCapsuleUnlocked : styles.vialCapsuleLocked),
                      }}
                    >
                      <span style={styles.vialQuantity}>{quantity}</span>
                    </div>
                    <span style={styles.vialName}>{specie}</span>
                    {!unlocked && (
                      <span style={styles.vialLockedLabel}>Verrouillé</span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <span style={styles.emptyGlyph}>◎</span>
              <p style={styles.emptyText}>
                Sélectionne une catégorie pour afficher les spécimens
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  

    </div>
  ) : null;
}



