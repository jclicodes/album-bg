const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const Vibrant = require("node-vibrant");

const { bufferTypeOf, getImageName } = require("./files.js");

const RESOLUTION = [2560, 1440];
const IMAGESIZE = [800, 800];

const canvas = createCanvas(RESOLUTION[0], RESOLUTION[1]);
const ctx = canvas.getContext("2d");

const getAlbumColours = async (image) => {
  let v = new Vibrant(image);
  console.log(v)
  return v.getPalette().then((palette) => {
    const swatches = Object.keys(palette);
    const randomSwatch = swatches[Math.floor(Math.random() * swatches.length)];
    const randomBg = palette[randomSwatch].hex;

    return randomBg;
  });
};

const drawAlbumCover = async (img) => {
  const [imgWidth, imgHeight] = IMAGESIZE;
  const [width, height] = RESOLUTION;

  const x = width / 2 - imgWidth / 2;
  const y = height / 2 - imgHeight / 2;

  loadImage(img).then((image) => {
    ctx.drawImage(image, x, y, imgWidth, imgHeight);
  });
};

const drawImage = async (bgColour, img, out) => {
  const [width, height] = RESOLUTION;

  ctx.fillStyle = bgColour;
  ctx.fillRect(0, 0, width, height);

  await drawAlbumCover(img);

  const outFile = "/" + out + "/" + getImageName(img);

  const bufferType = bufferTypeOf(outFile);
  const buffer = canvas.toBuffer(bufferType);
  fs.writeFileSync(outFile, buffer);
};

module.exports = { getAlbumColours, drawImage };
