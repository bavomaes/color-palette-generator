let width = 464;
let height = 317;
let img;
let pixelD;
let halfImage;

function setup() {
    createCanvas(width, height * 2);
    background(0);
    img = loadImage("../img/monet.jpg");
    pixelD = pixelDensity();
    halfImage = 4 * (width  * pixelD) * (height * pixelD);
}

function draw() {
    image(img, 0, 0, width, height);
    loadPixels();
    for (let i = 0; i < halfImage; i += 4) {
        pixels[i + halfImage] = pixels[i]
        pixels[i + halfImage + 1] = pixels[i + 1]
        pixels[i + halfImage + 2] = pixels[i + 2]
        pixels[i + halfImage + 3] = pixels[i + 3]
    }
    updatePixels();
}