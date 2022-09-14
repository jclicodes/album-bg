#!/usr/bin/env node

const { getAlbumColours, drawImage } = require("../src/colour.js");
const { filetypeSupported, parseOutDir } = require("../src/files.js");

const yargs = require("yargs");
const fs = require("node:fs");

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
  // .check((argv) => {
  //   if (!filetypeSupported(argv.img)) {
  //     throw new Error("-i only accepts jpg or png images.");
  //   } else if (!filetypeSupported(argv.out)) {
  //     throw new Error("-o only supports jpg or png output.");
  //   }
  //   return true;
  // })
  .argv;

const path = argv.img

if (!fs.existsSync(path)) {
  throw new Error("Path provided for -i argument does not exist on your file system.");
}

const isDir = fs.lstatSync(path).isDirectory();
let files;
let numImages = 1

if (isDir) {
  files = fs.readdirSync(path);
  numImages = files.length;
} else if (!filetypeSupported(argv.img)) {
  throw new Error("-i only accepts jpg or png images.");
}
   
const outPath = parseOutDir(argv.out);

for (let i = 0; i < numImages; i++) {
  let imagePath = argv.img + "/" + files[i];
  getAlbumColours(imagePath).then((randomBg) =>
    drawImage(randomBg, imagePath, outPath)
  );
}
