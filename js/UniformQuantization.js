/*
* Author: Bavo Maes
*
* This algorithm uses Uniform Quantization to divide the 3D RGB Color space into 8 segments.
* It then places the RGB value of each pixel into one of these 8 segments.
* The average of all RGB values per segment is then calculated and returned.
*
* This algorithm is based on a brief explanation of Uniform Quantization into 256 color segements.
* The explanation can be found here: https://web.cs.wpi.edu/~matt/courses/cs563/talks/color_quant/CQindex.html
*/

class UniformQuantization {
    constructor(imgPixels, imgWidth, imgHeight, pixelDens) {
        this.imgPixels = imgPixels;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.pixelDens = pixelDens;
        this.pixelCount = 4 * (imgWidth * pixelDens) * (imgHeight * pixelDens);
        this.colorBlocks = [];
        this.palette = [];
    }
    
    getPalette() {
        this.calculateColorBlocksSize();
        this.setColorBlocks();
        this.sortInColorBlocks();
        this.calculateColorBlockAverage();
        this.bubbleSortUniformColorBlocks();
        return this.palette;
    }
    
    calculateColorBlocksSize() {
        for (let i = 0; i < 8; i++) {
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
        let sortRed = Math.floor(red / 128);
        let sortGreen = Math.floor(green / 128);
        let sortBlue = Math.floor(blue / 128);
        let block = (sortRed * 2 * 2) + (sortGreen * 2) + sortBlue;
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
                this.palette.push([r, g, b, this.colorBlocks[i].length]);
            }
        }
    }
    
    bubbleSortUniformColorBlocks() {
        for (let i = this.palette.length - 1; i >= 0; i--) {
            for (let j = 1; j <= i; j++) {
                if (this.colorBlocks[j - 1].length > this.colorBlocks[j].length) {
                    let temp = this.palette[j - 1];
                    this.palette[j - 1] = this.palette[j];
                    this.palette[j] = temp;
                }
            }
        }
    }
}