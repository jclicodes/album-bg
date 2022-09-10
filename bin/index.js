#!/usr/bin/env node

const { getAlbumColours, drawImage } = require("../src/colour.js");
const { filetypeSupported } = require("../src/filetypes.js");
const yargs = require("yargs");

const argv = yargs(process.argv.slice(2))
  .option("img", {
    alias: "i",
    demandOption: true,
    description: "Single image or directory of images to use",
    type: "string",
  })
  .option("out", {
    alias: "o",
    demandOption: true,
    description: "Path to output target",
    type: "string",
  })
  .check((argv) => {
    if (!filetypeSupported(argv.img)) {
      throw new Error("-i only accepts jpg or png images.");
    } else if (!filetypeSupported(argv.out)) {
      throw new Error("-o only supports jpg or png output.");
    }
    return true;
  })
  .argv;

getAlbumColours(argv.img).then((randomBg) =>
  drawImage(randomBg, argv.img, argv.out)
);
