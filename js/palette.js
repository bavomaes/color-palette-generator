let width = 464;
let height = 317;

function setup() {
    createCanvas(width, height);
    pixelDensity(1);
}

function draw() {
    background(22);
    loadPixels();
    for (let x = 0; x < 464; x++) {
        for (let y = 0; y < 317; y++) {
            let index = (x + y * width)*4;
            pixels[index] = random(0, 255);
            pixels[index+1] = random(0, 255);
            pixels[index+2] = random(0, 255);
            pixels[index+3] = random(0, 255);
        }
    }
    updatePixels();
}