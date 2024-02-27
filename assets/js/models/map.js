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

    constructor(pixelHeight,pixelWidth,mapId){
        this.width = 0;
        this.height = 0;
        this.map = [];
        this.mapId = mapId;
        this.pixelHeight = pixelHeight;
        this.pixelWidth = pixelWidth;
        console.log("Map constructor created");
    }

    async loadMap() {
        console.log("Attempting to load Map - ", this.mapId)
        try {
            this.map = await Api.getPixelMap(this.mapId);
            this.width = this.map[0].length;
            this.height = this.map.length;
            console.log("Map loaded successfully:", this.map);
        } catch (error) {
            console.error("Error loading map:", error);
        }
    }

    /**
     * Position of pixel on map
     * @param {Number} x 
     * @param {Number} y 
     */
    getPixelAtCoords(x,y){
        
    }

    async updateMap(){

    }
}