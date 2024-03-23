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
            const response = await Api.getPixelMap(this.mapId);
            console.log(response);
            this.map = response.map;
            this.width = response.data.width;
            this.height = response.data.height;
        } catch (error) {
            console.error("Error loading map:", error);
        }
    }
}