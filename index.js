#!/usr/bin/env node
const { getAlbumColours, drawImage } = require('./colour.js')
const yargs = require('yargs')

const argv = yargs(process.argv.slice(2))
  .option('img', {
    alias: 'i',
    demandOption: true,
    description: 'Single image or directory of images to use',
    type: 'string'
  })
  .option('out', {
    alias: 'o',
    demandOption: true,
    description: 'Path to output target',
    type: 'string'
  })
  .argv


getAlbumColours(argv.img).then(randomBg => drawImage(randomBg, argv.img, argv.out))
