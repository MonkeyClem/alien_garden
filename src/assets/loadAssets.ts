export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      console.log("Image chargée :", src);
      resolve(image);
    };
    image.onerror = () => {
      console.error("Image NON chargée :", src);
      reject(new Error(`Image introuvable : ${src}`));
    };

    image.src = src;
  });
};

export const loadAssets = async () => {
  const bioBattery = await loadImage("/assets/PNG/Assets/biobattery.png");
  const bioPalmtree = await loadImage("/assets/PNG/Assets/bioPalmtree.png");
  const trapStore = await loadImage("/assets/PNG/Assets/trapStore.png")
  const bioTerminal = await loadImage("/assets/PNG/Assets/bioTerminal.png")

  const reactorMushroomStageOne = await loadImage("/assets/PNG/Assets/reactor_mushroom_stage_one.png")
  const reactorMushroomStageTwo = await loadImage ("/assets/PNG/Assets/reactor_mushroom_stage_two.png")
  const reactorMushroomStageThree = await loadImage ("/assets/PNG/Assets/reactor_mushroom_stage_three.png")

  const inventoryIcon = await loadImage ("/assets/PNG/Assets/inventory_icon.png")
  const alienGround = await loadImage ("/assets/PNG/Assets/alienGround.png")
  const alienGroundTwo = await loadImage ("/assets/PNG/Assets/alien_ground_two.png")
    const alienGroundThree = await loadImage ("/assets/PNG/Assets/alien_ground_three.png")


    const veins = await loadImage ("/assets/PNG/Assets/veins.png")
    const spores =  await loadImage ("/assets/PNG/Assets/spores.png")
    const smallRock = await loadImage ("/assets/PNG/Assets/smallRock.png")

    const spacePod = await loadImage ("/assets/PNG/Assets/spacePod.png")

  


  return {
    bioBattery,
    bioPalmtree,
    trapStore,
    bioTerminal,

    reactorMushroomStageOne,
    reactorMushroomStageTwo,
    reactorMushroomStageThree, 

    inventoryIcon,

    alienGround,
    alienGroundTwo,
    alienGroundThree,

    veins,
    spores,
    smallRock,

    spacePod
  };
};


