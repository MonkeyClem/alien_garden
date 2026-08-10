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