let width = 464;
let height = 317;
let img;
let pixelD;
let halfImage;
let allPixels;
let imgWidth;
let imgHeight;

function preload() {
    img = loadImage("img/monet.jpg");
}

function setup() {
    setCanvasSize();
    background(0);
    pixelD = pixelDensity();
    halfImage = 4 * (width  * pixelD) * (height * pixelD);
    allPixels = [];
    noLoop();
}

function draw() {
    image(img, 0, 0);
    loadPixels();
    for (let i = 0; i < halfImage; i += 4) {
        pixels[i + halfImage] = pixels[i]
        pixels[i + halfImage + 1] = pixels[i + 1];
        pixels[i + halfImage + 2] = pixels[i + 2];
        pixels[i + halfImage + 3] = pixels[i + 3];
        allPixels.push([pixels[i + halfImage], pixels[i + halfImage + 1], pixels[i + halfImage + 2], pixels[i + halfImage + 3]]);
    }
    updatePixels();
}

function setCanvasSize() {
    imgWidth = img.width;
    imgHeight = img.height;
    createCanvas(imgWidth, imgHeight * 2);
}