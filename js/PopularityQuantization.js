/*
* Author: Bavo Maes
*
* This algorithm uses Popularity Uniform Quantization to divide the 3D RGB Color space into 512 segments.
* It then places the RGB value of each pixel into one of these 512 segments.
* The segments are then sorted using a bubble sort algorithm to define which have the most RGB values stored in them. Only the most popular segments will be chosen.
* The average of all RGB values per segment is then calculated and returned.
*
* This algorithm is based on a brief explanation of Popularity Uniform Quantization into 262,144 color segements.
* The explanation can be found here: https://web.cs.wpi.edu/~matt/courses/cs563/talks/color_quant/CQindex.html
*/

class PopularityQuantization {
    constructor(imgPixels, imgWidth, imgHeight, pixelDens, paletteAmount) {
        this.imgPixels = imgPixels;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.pixelDens = pixelDens;
        this.paletteAmount = paletteAmount;
        this.colorBlocks = [];
        this.avarageColorBlocks = [];
        this.resolution = 8;
        this.pixelCount = 4 * (imgWidth * pixelDens) * (imgHeight * pixelDens);
        this.palette = [];
    }
    
    getPalette() {
        this.calculateColorBlocksSize();
        this.setColorBlocks();
        this.calculateColorBlockAverage();
        this.bubbleSortAvarageColorBlocks();
        return this.createPalette();
    }
    
    calculateColorBlocksSize() {
        let colorSpace = 256 * 256 * 256;
        let colorGroups = colorSpace / Math.pow(this.resolution, 3);
        for (let i = 0; i < colorGroups; i++) {
            this.colorBlocks.push([]);
        }
    }
    
    setColorBlocks() {
        for (let i = 0; i < this.pixelCount; i += 4) {
            let r = this.imgPixels[i]
            let g = this.imgPixels[i + 1];
            let b = this.imgPixels[i + 2];
            let block = this.sortInColorBlocks(r, g, b);
            this.colorBlocks[block].push([r, g, b]);
        }
    }
    
    sortInColorBlocks(red, green, blue) {
        let sortRed = Math.floor(red / (256 / this.resolution));
        let sortGreen = Math.floor(green / (256 / this.resolution));
        let sortBlue = Math.floor(blue / (256 / this.resolution));
        let block = (sortRed * this.resolution * this.resolution) + (sortGreen * this.resolution) + sortBlue;
        return block;
    }
    
    calculateColorBlockAverage() {
        for (let i = 0; i < this.colorBlocks.length; i++) {
            if (this.colorBlocks[i].length > 0) {
                let r = 0, g = 0, b = 0;
                for (let j = 0; j < this.colorBlocks[i].length; j++) {
                    r = r + this.colorBlocks[i][j][0];
                    g = g + this.colorBlocks[i][j][1];
                    b = b + this.colorBlocks[i][j][2]
                }
                r = Math.floor(r / this.colorBlocks[i].length);
                g = Math.floor(g / this.colorBlocks[i].length);
                b = Math.floor(b / this.colorBlocks[i].length);
                this.avarageColorBlocks.push([r, g, b, this.colorBlocks[i].length]);
            }
        }
    }
    
    bubbleSortAvarageColorBlocks() {
        for (let i = this.avarageColorBlocks.length - 1; i >= 0; i--) {
            for (let j = 1; j <= i; j++) {
                if (this.avarageColorBlocks[j - 1][3] > this.avarageColorBlocks[j][3]) {
                    let temp = this.avarageColorBlocks[j - 1];
                    this.avarageColorBlocks[j - 1] = this.avarageColorBlocks[j];
                    this.avarageColorBlocks[j] = temp;
                }
            }
        }
    }
    
    createPalette() {
        for (let i = this.avarageColorBlocks.length - 1; i > this.avarageColorBlocks.length - (this.paletteAmount + 1); i--) {
            this.palette.push([this.avarageColorBlocks[i][0], this.avarageColorBlocks[i][1], this.avarageColorBlocks[i][2]]);
        }
        return this.palette;
    }
}