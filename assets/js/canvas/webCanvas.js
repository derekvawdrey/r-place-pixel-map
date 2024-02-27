
class pixelatedCanvas{
    gameHolder
    app
    zoom
    camPos
    scale
    map
    drawnMap
    pixelBorder

    /**
     * 
     * @param {Element} gameHolder 
     * @param {PixelatedMap} map 
     * @returns 
     */
    constructor(gameHolder, map){
        this.gameHolder = gameHolder;
        this.map = map;
        this.app = new PIXI.Application({
            background: '#1099bb',
            resizeTo: window,
        });

        
        
        if(this.gameHolder == null){
            console.log("ERROR: webgl cannot load");
            return;
        }

        if(this.map == null){
            console.log("ERROR: Map doesn't exist!");
            return;
        }

        this.drawnMap = new PIXI.Graphics();
        this.drawnMap.interactive = true;
        this.drawnMap.on("mousemove", (event) => this.updatePixelDrawer(event));
        this.drawnMap.x = (this.app.renderer.width - this.map.width * this.map.pixelWidth) / 2;
        this.drawnMap.y = (this.app.renderer.height - this.map.height * this.map.pixelHeight) / 2;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this.pixelBorder = new PIXI.Graphics();


        //Append the game holder to the canvas screen
        this.gameHolder.append(this.app.view);

        this.app.stage.addChild(this.drawnMap);

        this.zoom = {x:1.00, y:1.00}
        this.scale = {x:1.00, y:1.00}
        this.camPos = {x:0.00, y:0.00}

        this.drawMapToCanvas();
    }

    /**
     * Draws the map to the canvas
     */
    drawMapToCanvas(){
        this.drawnMap.clear();
        if(!this.map){
            console.log("ERROR: Map doesn't exist!")
            return;
        }

        let pixelSizeX = this.map.pixelWidth;
        let pixelSizeY = this.map.pixelHeight;

        for (let col = 0; col < this.map.width; col+=1){
            for(let row = 0; row < this.map.height; row+=1){
                let pixel = this.map.map[col][row];
                this.drawnMap.beginFill(PIXI.utils.rgb2hex([pixel.r / 255, pixel.g / 255, pixel.b / 255]));
                this.drawnMap.drawRect(pixel.x * pixelSizeX, pixel.y * pixelSizeY, pixelSizeX, pixelSizeY);
                this.drawnMap.endFill();
            }
        }
    }

    /**
     * 
     * 
     */
    fetchMapUpdates(){
        
    }

    /**
     * 
     * @param {Pixel} pixel
     *  
     */
    drawPixel(pixel){

    }



    updatePixelDrawer(event) {
        const mouseX = event.data.global.x - this.drawnMap.x;
        const mouseY = event.data.global.y - this.drawnMap.y;
    
        // Calculate the grid coordinates of the hovered pixel
        const gridX = Math.floor(mouseX / this.map.pixelWidth);
        const gridY = Math.floor(mouseY / this.map.pixelHeight);
    
        console.log("Relative Coordinates:", mouseX, mouseY);
        console.log("Grid Coordinates:", gridX, gridY);

        this.pixelBorder.clear();
        this.pixelBorder.lineStyle(2, 0xFF0000); // Set border color and thickness
        this.pixelBorder.drawRect(
            gridX * this.map.pixelWidth,
            gridY * this.map.pixelHeight,
            this.map.pixelWidth,
            this.map.pixelHeight
        );
        this.drawnMap.addChild(this.pixelBorder);
    }
        

}