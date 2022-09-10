const { createCanvas, loadImage } = require('canvas')
const Vibrant = require('node-vibrant')

const RESOLUTION = ["2560", "1440"]
const IMAGE = "example.jpg"

const canvas = createCanvas(RESOLUTION[0], RESOLUTION[1])
const ctx = canvas.getContext('2d')

const getAlbumColours = () => {
  Vibrant.from(IMAGE)
    .quality(1)
    .clearFilters()
    .getPalette()
    .then(palette => {
      const swatches = Object.keys(palette)
      const randomSwatch = swatches[(Math.ceil(Math.random() * swatches.length))]
      const randomBg = palette[randomSwatch].getHex()

      return randomBg
    })
    // TODO: Exception if colours cannot be extracted
  return ''
}







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
