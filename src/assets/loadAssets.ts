import { loadImage } from "./loadImage";

export const loadAssets = async () => {
  const bioBattery = await loadImage("/assets/PNG/Assets/biobattery.png");
  const bioPalmtree = await loadImage("/assets/PNG/Assets/bioPalmtree.png");
  const trapStore = await loadImage("/assets/PNG/Assets/trapStore.png");
  const bioTerminal = await loadImage("/assets/PNG/Assets/bioTerminal.png");

  const reactorMushroomStageOne = await loadImage(
    "/assets/PNG/Assets/reactor_mushroom_stage_one.png",
  );
  const reactorMushroomStageTwo = await loadImage(
    "/assets/PNG/Assets/reactor_mushroom_stage_two.png",
  );
  const reactorMushroomStageThree = await loadImage(
    "/assets/PNG/Assets/reactor_mushroom_stage_three.png",
  );

  const synapticVineStageOne = await loadImage(
    "/assets/PNG/Assets/synapticVine_stage_one.png",
  );

  const synapticVineStageTwo = await loadImage(
    "/assets/PNG/Assets/synapticVine_stage_two.png",
  );

  const inventoryIcon = await loadImage("/assets/PNG/Assets/inventory_icon.png");
  const alienGround = await loadImage("/assets/PNG/Assets/alienGround.png");
  const alienGroundTwo = await loadImage("/assets/PNG/Assets/alien_ground_two.png");
  const alienGroundThree = await loadImage("/assets/PNG/Assets/alien_ground_three.png");

  const veins = await loadImage("/assets/PNG/Assets/veins.png");
  const spores = await loadImage("/assets/PNG/Assets/spores.png");
  const smallRock = await loadImage("/assets/PNG/Assets/smallRock.png");

  const spacePod = await loadImage("/assets/PNG/Assets/spacePod.png");

  const mapBackground = await loadImage("/assets/PNG/Assets/mapBackground.jpg");
  const midground = await loadImage("/assets/PNG/Assets/midground.png");
  const midgroundTwo = await loadImage("/assets/PNG/Assets/midground_two.png");
  const midgroundThree = await loadImage("/assets/PNG/Assets/midground_three.png");
  const midgroundFour = await loadImage("/assets/PNG/Assets/midground_four.png");

  const firstMapLake = await loadImage("/assets/PNG/Assets/first_map_lake.png");

  const midgroundFillerOne = await loadImage("/assets/PNG/Assets/midgroundFillerOne.png");

  const foreground = await loadImage("/assets/PNG/Assets/foreground.png");

  const bioMass = await loadImage("/assets/PNG/Assets/bioMass.png");
  const bioEnergy = await loadImage("/assets/PNG/Assets/bioEnergy.png");
  const biologicalData = await loadImage("/assets/PNG/Assets/biologicalData.png");

  const open_mission_button = await loadImage(
    "/assets/PNG/Assets/open_mission_button.png",
  );
  const close_mission_button = await loadImage(
    "/assets/PNG/Assets/close_mission_button.png",
  );

  return {
    bioBattery,
    bioPalmtree,
    trapStore,
    bioTerminal,

    reactorMushroomStageOne,
    reactorMushroomStageTwo,
    reactorMushroomStageThree,

    synapticVineStageOne,
    synapticVineStageTwo,

    inventoryIcon,
    open_mission_button,
    close_mission_button,

    alienGround,
    alienGroundTwo,
    alienGroundThree,

    veins,
    spores,
    smallRock,

    spacePod,

    mapBackground,
    midground,
    midgroundTwo,
    midgroundThree,
    midgroundFour,

    midgroundFillerOne,

    firstMapLake,

    foreground,

    bioMass,
    bioEnergy,
    biologicalData,
  };
};

