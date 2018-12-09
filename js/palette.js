let width;
let height;
let img;
let pixelD;
let halfImage;
let allPixels;
let colorPalette;

function preload() {
    img = loadImage("img/vangogh.jpg");
    imgA = new Image;
}

function setup() {
    setCanvasSize();
    background(0);
    pixelD = pixelDensity();
    halfImage = 4 * (width  * pixelD) * (height * pixelD);
    allPixels = [[], [], [], [], [], [], [], []];
    colorPalette = [[], [], [], [], [], [], [], []];
    noStroke();
    noLoop();
}

function draw() {
    image(img, 0, 0);
    loadPixels();
    uniformQuantization();
}

function setCanvasSize() {
    width = img.width;
    height = img.height;
    createCanvas(width, height + 20);
}

function uniformQuantization() {
    for (let i = 0; i < halfImage; i += 4) {
        let r = pixels[i]
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let block = Math.floor(r / (256 / 8));
        allPixels[block].push([r, g, b]);
    }
    checkAverageBlocks();
    drawColorPalette();
    console.log(colorPalette);
}

function checkAverageBlocks() {
    for (let i = 0; i < allPixels.length; i++) {
        let r = 0;
        let g = 0;
        let b = 0;
        for (let j = 0; j < allPixels[i].length; j++) {
            r = r + allPixels[i][j][0];
            g = g + allPixels[i][j][1];
            b = b + allPixels[i][j][2]
        }
        r = Math.floor(r / allPixels[i].length);
        g = Math.floor(g / allPixels[i].length);
        b = Math.floor(b / allPixels[i].length);
        colorPalette[i].push(r, g, b);
    }
}

function drawColorPalette() {
    for (let i = 0; i < colorPalette.length; i++) {
        fill(colorPalette[i][0], colorPalette[i][1], colorPalette[i][2]);
        rect(i * width / colorPalette.length, height, width / colorPalette.length, 20);
    }
}