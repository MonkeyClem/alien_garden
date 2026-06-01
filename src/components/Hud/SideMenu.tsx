import type { Tile } from "../../game/type";

interface SideMenuProps {
  isOpen: boolean;
  selectedTile: Tile;
  handlePlantSeed : (selectedTile : Tile) => void 
}

export default function SideMenu({ isOpen, selectedTile, handlePlantSeed }: SideMenuProps) {


    console.log('SelectedTile in the SideMenu : ', selectedTile)

 
  return (
    <div
      style={{
        background: "#101010",
        position: "absolute",
        height: isOpen ? "100vh" : 0,
        width: isOpen ? "15vw" : 0,
        right: 0,
      }}
    >
      {isOpen ? (
        <>
          <p>Menu Ouvert</p>

          <h4>SELECTED TILE </h4>
          {selectedTile ? (
            <>
              {" "}
              <p>Tile ID : {selectedTile.id}</p>
              <p>Graine Plantée ? {selectedTile.hasSeed ? "oui" : "non"}</p>
              {selectedTile.hasSeed ? null : (
                <div style={{}}>
                      <button
                    onClick={() => handlePlantSeed(selectedTile)}
                > Planter une graine </button> </div>
              
              )}
              <p>Central pos x : {selectedTile.x}</p>
              <p>Central pos x : {selectedTile.y}</p>
            </>
          ) : (
            <p>No tile selected</p>
          )}
        </>
      ) : null}
      ------------
    </div>
  );
}
