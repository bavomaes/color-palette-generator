let palette1;
let palette2;
let width;
let height;
let pixelD;
let paletteSize;

function preload() {
    img = loadImage("img/monet.jpg");
}

function setup() {
    setCanvasSize();
    background(0);
    pixelD = pixelDensity();
    paletteSize = 8;
    noStroke();
    noLoop();
}

function draw() {
    image(img, 0, 0);
    loadPixels();
    getPalettes();
    drawPalettes();
}

function setCanvasSize() {
    width = img.width;
    height = img.height;
    createCanvas(width, height + 50);
}

function getPalettes() {
    let uniform = new UniformQuantization(pixels, width, height, pixelD);
    let popularity = new PopularityQuantization(pixels, width, height, pixelD, paletteSize);
    palette1 = uniform.getPalette();
    palette2 = popularity.getPalette();
}

function drawPalettes() {
    for (let i = 0; i < palette1.length; i++) {
        fill(palette1[i][0], palette1[i][1], palette1[i][2]);
        rect(i * 20, height + 5, 20, 20);
    }
    for (let i = 0; i < palette2.length; i++) {
        fill(palette2[i][0], palette2[i][1], palette2[i][2]);
        rect(i * 20, height + 30, 20, 20);
    }
}