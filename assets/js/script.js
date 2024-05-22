// TODO:
// - create ui (file upload - (video))
// - reprompt camera permission

let img, capture, pixelation_level = 5, threshold = 128, showCapture = false
function setup() {
  createCanvas(500, 500)
}

function draw() {
  if(showCapture) {
    pixelizeImg(capture, pixelation_level, true)
    console.log(capture)
  }
}


// UI
const fileInput = document.querySelector(".file-input")
const resetBtn = document.querySelector(".reset")
const cameraBtn = document.querySelector(".camera")

fileInput.addEventListener("change", displayImg)
resetBtn.addEventListener("click", () => {
  img = undefined
  showCapture = false 
  fileInput.value = ""
  resetBtn.classList.add("hide")
  fileInput.classList.remove("hide")
  cameraBtn.classList.remove("hide")
  clear()
})
cameraBtn.addEventListener("click", () => {
  fileInput.classList.add("hide")
  cameraBtn.classList.add("hide")
  resetBtn.classList.remove("hide")
  capture = createCapture(VIDEO)
  capture.hide()
  showCapture = true  
})

function displayImg(e) {
  const myImageFile = e.target.files[0]
  let urlOfImageFile = URL.createObjectURL(myImageFile)
  img = loadImage(urlOfImageFile, () => pixelizeImg(img, pixelation_level))
  fileInput.classList.add("hide")
  cameraBtn.classList.add("hide")
  setTimeout(() => {
    resetBtn.classList.remove("hide")
  }, 5000)
}

function pixelizeImg(img, pixelation_level, isVideo) {
  pixelDensity(1)
  const {offsetX, offsetY, newWidth, newHeight} = fixedResolution(500, img)
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

      if(!isVideo) {
        // add delay on pixelization
        setTimeout(() => {
          fill(`rgb(${color}, ${color}, ${color})`)
          rect(x, y, 50, 50)
        }, y * 5)
      } else {
        fill(`rgb(${color}, ${color}, ${color})`)
        rect(x, y, 50, 50)
      }
    }
  }
}

function fixedResolution(width, element) {
  // adjust image size to fit to canvas (object-fit: cover)
  const scaleX = width / element.width
  const scaleY = width / element.height
  const scale = Math.max(scaleX, scaleY)
  const newWidth = element.width * scale
  const newHeight = element.height * scale
  const offsetX = (width - newWidth) / 2
  const offsetY = (width - newHeight) / 2

  return {offsetX, offsetY, newWidth, newHeight}
}