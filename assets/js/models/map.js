class PixelatedMap{

    // How many pixels by how many pixels
    width;
    height;

    // Pixel data in array
    map;
    // Map id
    mapId;

    // How many pixels should a single Pixel object take up?
    pixelHeight;
    pixelWidth;

    constructor(width,height,pixelHeight,pixelWidth,map,mapId){
        this.width = width;
        this.height = height;
        this.map = map;
        this.mapId = mapId;

        this.pixelHeight = pixelHeight;
        this.pixelWidth = pixelWidth;
    }

    initMap(){
        
    }

    /**
     * Position of pixel on map
     * @param {Number} x 
     * @param {Number} y 
     */
    getPixelAtCoords(x,y){
        
    }

    async loadMap(){

    }

    async updateMap(){

    }
}