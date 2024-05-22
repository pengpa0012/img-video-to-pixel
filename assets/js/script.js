// TODO:
// - create ui (file upload - (video) / record via camera)
// - display on canvas
// - get image data
// - get coordinates and paint on canvas (pixelated)
let img, pixelation_level = 5, threshold = 128
function setup() {
  createCanvas(500, 500)
}

// use draw on video/record maybe
// function draw() {
//   if(img) {
//     img.loadPixels()
//     console.log(img.pixels)
    
//     // Update the image.
//     // img.updatePixels();
  
//     // // Display the image.
//     // image(img, 0, 0, 500, 500);
//   }
// }


// UI
const fileInput = document.querySelector(".file-input")
const resetBtn = document.querySelector(".reset")

fileInput.addEventListener("change", displayImg)
resetBtn.addEventListener("click", () => {
  img = undefined
  fileInput.value = ""
  resetBtn.classList.add("hide")
  fileInput.classList.remove("hide")
  clear()
})

function displayImg(e) {
  const myImageFile = e.target.files[0]
  let urlOfImageFile = URL.createObjectURL(myImageFile)
  img = loadImage(urlOfImageFile, () => pixelizeImg(img, pixelation_level))
  fileInput.classList.add("hide")
  setTimeout(() => {
    resetBtn.classList.remove("hide")
  }, 5000)
}

function pixelizeImg(img, pixelation_level) {
  pixelDensity(1)
  // adjust image size to fit to canvas (object-fit: cover)
  const scaleX = 500 / img.width
  const scaleY = 500 / img.height
  const scale = Math.max(scaleX, scaleY)
  const newWidth = img.width * scale
  const newHeight = img.height * scale
  const offsetX = (500 - newWidth) / 2
  const offsetY = (500 - newHeight) / 2

  image(img, offsetX, offsetY, newWidth, newHeight)
  loadPixels()
  noStroke()
  for (let x = 0; x < width; x += pixelation_level) {
    for (let y = 0; y < height; y += pixelation_level) {
      let i = (x + y * width) * 4

      let r = pixels[i + 0]
      let g = pixels[i + 1]
      let b = pixels[i + 2]
      let a = pixels[i + 3]

      // Calculate brightness
      let brightness = 0.299 * r + 0.587 * g + 0.114 * b
      // Determine color based on brightness and threshold
      let color = brightness > threshold ? 255 : 0

      // add delay on pixelization
      setTimeout(() => {
        fill(`rgb(${color}, ${color}, ${color})`)
        rect(x, y, 50, 50)
      }, y * 5)
    }
  }
}