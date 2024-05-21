// TODO:
// - create ui (file upload - (video) / record via camera)
// - display on canvas
// - get image data
// - get coordinates and paint on canvas (pixelated)
let img
function setup() {
  createCanvas(windowWidth, windowHeight)
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  if(img) image(img, 0, 0, windowWidth, windowHeight)
}


// UI
const fileInput = document.querySelector(".file-input")
const resetBtn = document.querySelector(".reset")

fileInput.addEventListener("change", displayImg)
resetBtn.addEventListener("click", () => {
  img = undefined
  fileInput.value = ""
  resetBtn.classList.add("hide")
  fileInput.classList.remove("hide")
})

function displayImg(e) {
  const myImageFile = e.target.files[0]
  let urlOfImageFile = URL.createObjectURL(myImageFile)
  img = loadImage(urlOfImageFile, () => {image(img, 0, 0)})
  fileInput.classList.add("hide")
  resetBtn.classList.remove("hide")
}