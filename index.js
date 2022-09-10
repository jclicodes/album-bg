const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const Vibrant = require('node-vibrant')

const RESOLUTION = [2560, 1440]
const IMAGE = "example.jpg"
const IMAGESIZE = [800, 800]

const canvas = createCanvas(RESOLUTION[0], RESOLUTION[1])
const ctx = canvas.getContext('2d')

const getAlbumColours = async (image) => {
  let v = new Vibrant(image)
  return v.getPalette().then((palette) => {
    const swatches = Object.keys(palette)
    const randomSwatch = swatches[(Math.ceil(Math.random() * swatches.length))]
    const randomBg = palette[randomSwatch].getHex()

    return randomBg
  })
}

const drawAlbumCover = async (img) => {
  const [imgWidth, imgHeight] = IMAGESIZE
  const [width, height] = RESOLUTION

  const x = width / 2 - imgWidth / 2
  const y = height/ 2 - imgHeight / 2

  loadImage(img).then(image => {
    ctx.drawImage(image, x, y, imgWidth, imgHeight)
  })
}

const drawImage = async (bgColour) => {
  const [width, height] = RESOLUTION

  ctx.fillStyle = bgColour
  ctx.fillRect(0, 0, width, height) 

  await drawAlbumCover(IMAGE)

  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('test.png', buffer)
}


getAlbumColours(IMAGE).then(randomBg => drawImage(randomBg))

// // Write "Awesome!"
// ctx.font = '30px Impact'
// ctx.rotate(0.1)
// ctx.fillText('Awesome!', 50, 100)
//
// // Draw line under text
// var text = ctx.measureText('Awesome!')
// ctx.strokeStyle = 'rgba(0,0,0,0.5)'
// ctx.beginPath()
// ctx.lineTo(50, 102)
// ctx.lineTo(50 + text.width, 102)
// ctx.stroke()
//
// // Draw cat with lime helmet
// loadImage('example.jpg').then((image) => {
//   ctx.drawImage(image, 50, 0, 70, 70)
//   const buffer = canvas.toBuffer('image/png')
//   fs.writeFileSync('./test.png', buffer)
// })
