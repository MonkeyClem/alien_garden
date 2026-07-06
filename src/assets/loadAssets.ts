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

  return {
    bioBattery,
    bioPalmtree,
    trapStore,
    bioTerminal,

    reactorMushroomStageOne,
    reactorMushroomStageTwo,
    reactorMushroomStageThree
  };
};
