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
        this.calculateColorBlocks();
        this.setColorBlocks();
        this.sortInColorBlocks();
        this.calculateColorBlockAverage();
        return this.palette;
    }
    
    calculateColorBlocks() {
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
}