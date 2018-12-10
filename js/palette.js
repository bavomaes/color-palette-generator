let width;
let height;
let img;
let pixelD;
let halfImage;
let allPixels;
let colorPalette;
let totalPixels;
let popularityBlocks;

function preload() {
    img = loadImage("img/monet.jpg");
}

function setup() {
    setCanvasSize();
    background(0);
    pixelD = pixelDensity();
    halfImage = 4 * (width  * pixelD) * (height * pixelD);
    allPixels = [[], [], [], [], [], [], [], []];
    colorPalette = [[], [], [], [], [], [], [], []];
    popularityBlocks = [];
    noStroke();
    noLoop();
}

function draw() {
    image(img, 0, 0);
    loadPixels();
//    uniformQuantization();
    popularityQuantization();
}

function popularityQuantization() {
    setAllPixels('popularity');
    for (let i = 0; i < halfImage; i += 4) {
        let r = pixels[i]
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let block = popularitySort(r, g, b);
        allPixels[block].push([r, g, b]);
    }
    popularityCalculateAvarage();
    bubbleSortPopularity();
    drawPopularityPalette();
}


function popularitySort(red, green, blue){
    let sortRed = Math.floor(red / 32);
    let sortGreen = Math.floor(green / 32);
    let sortBlue = Math.floor(blue / 32);
    let block = (sortRed * 8 * 8) + (sortGreen * 8) + sortBlue;
    return block;
}

function popularityCalculateAvarage() {
    for (let i = 0; i < allPixels.length; i++) {
        if (allPixels[i].length > 0) {
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
            popularityBlocks.push([r, g, b, allPixels[i].length]);
        }
    }
}

function bubbleSortPopularity() {
    for (let i = popularityBlocks.length - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (popularityBlocks[j - 1][3] > popularityBlocks[j][3]) {
                let temp = popularityBlocks[j - 1];
                popularityBlocks[j - 1] = popularityBlocks[j];
                popularityBlocks[j] = temp;
            }
        }
    }
}

function drawPopularityPalette() {
    let currentWidth = 0;
    let counter = 0;
    for (let i = popularityBlocks.length - 1; i > popularityBlocks.length - 2; i--) {
        console.log(popularityBlocks[i][0], popularityBlocks[i][1], popularityBlocks[i][2]);
        fill(popularityBlocks[i][0], popularityBlocks[i][1], popularityBlocks[i][2]);
        rect(20 * counter, height + 5, 20, 20);
        counter++;
    }
}

function uniformQuantization() {
    setAllPixels('uniform');
    for (let i = 0; i < halfImage; i += 4) {
        let r = pixels[i]
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let block = uniformSort(r, g, b);
        allPixels[block].push([r, g, b]);
    }
    checkAverageBlocks();
    calculateTotalPixels();
    drawColorPalette();
    console.log(colorPalette);
}

function uniformSort(red, green, blue) {
    let sortRed = Math.floor(red / 128);
    let sortGreen = Math.floor(green / 128);
    let sortBlue = Math.floor(blue / 128);
    let block = (sortRed * 2 * 2) + (sortGreen * 2) + sortBlue;
    return block;
}

function setCanvasSize() {
    width = img.width;
    height = img.height;
    createCanvas(width, height + 40);
}

function setAllPixels(type) {
    allPixels = [];
    let colorSpace = 256 * 256 * 256;
    let colorGroups = 0;
    if (type == 'popularity') {
        // Divide the RGB color space in elements of 4x4x4
        colorGroups = colorSpace / (4 * 4 * 4); 
    } else if (type == 'uniform') {
        // Divide the RGB color space in 8 equal elements
        colorGroups = 8;
    }
    for (let i = 0; i < colorGroups; i++) {
            allPixels.push([]);
    }
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
    let currentWidth = 0;
    for (let i = 0; i < colorPalette.length; i++) {
        fill(colorPalette[i][0], colorPalette[i][1], colorPalette[i][2]);
        rect(currentWidth, height + 20, allPixels[i].length / totalPixels * width, 20);
        currentWidth = currentWidth + allPixels[i].length / totalPixels * width;
    }
}

function calculateTotalPixels() {
    let counter = 0;
    for (let i = 0; i < allPixels.length; i++) {
        for (let j = 0; j < allPixels[i].length; j++) {
            counter++;
        }
    }
    totalPixels = counter;
    return counter;
}