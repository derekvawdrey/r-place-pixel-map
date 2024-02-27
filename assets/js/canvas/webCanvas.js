
class pixelatedCanvas{
    gameHolder
    app
    zoom
    camPos
    scale
    map
    drawnMap
    pixelBorder
    initalized

    /**
     * 
     * @param {Element} gameHolder 
     * @param {PixelatedMap} map 
     * @returns 
     */
    constructor(gameHolder, map){
        this.gameHolder = gameHolder;
        this.map = map;
        this.initalized = false;

        this.app = new PIXI.Application({
            background: '#EEE',
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
        this.drawnMap.on("pointerout", (event) => this.removePixelDrawer(event));
        this.drawnMap.on("mousemove", (event) => this.updatePixelDrawer(event));
        this.drawnMap.on("click", (event) => this.handleClickEvent(event));
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
        this.initializeZoomEvents();
        this.initalizePanningEvents();
        this.initalized = true;

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


        for (let col = 0; col < this.map.width; col+=1){
            for(let row = 0; row < this.map.height; row+=1){
                let pixel = this.map.map[col][row];
                this.drawPixel(pixel);
            }
        }
    }

    /**
     * Zoom in by a factor
     * @param {number} factor - The zoom factor
     */
    zoomIn(factor) {
        this.zoom.x *= factor;
        this.zoom.y *= factor;
        this.updateZoom();
    }

    /**
     * Zoom out by a factor
     * @param {number} factor - The zoom factor
     */
    zoomOut(factor) {
        this.zoom.x /= factor;
        this.zoom.y /= factor;
        this.updateZoom();
    }

    /**
     * Update the zoom properties and redraw the map
     */
    updateZoom() {
        this.scale.x = this.zoom.x;
        this.scale.y = this.zoom.y;

        this.drawnMap.scale.set(this.scale.x, this.scale.y);
        this.drawMapToCanvas();
    }

    /**
     * Handle mouse wheel event for zooming
     * @param {WheelEvent} event - The wheel event
     */
    handleZoom(event) {
        const zoomFactor = 1.1;
        if (event.deltaY < 0) {
            // Zoom in when scrolling up
            this.zoomIn(zoomFactor);
        } else {
            // Zoom out when scrolling down
            this.zoomOut(zoomFactor);
        }

        event.preventDefault(true);
    }

    /**
     * Initialize event listeners for zooming
     */
    initializeZoomEvents() {
        this.app.view.addEventListener("wheel", (event) => this.handleZoom(event));
    }
    /**
     * Initalize Panning events
     */
    initalizePanningEvents(){
        this.app.view.addEventListener("mousedown", (event) => {
            if (event.button === 1) { 
                this.startPan(event);
            }
        });

        this.app.view.addEventListener("mousemove", (event) => {
            if (event.buttons === 4) {
                this.pan(event);
            }
        });
    }

    /**
     * Start panning when the middle mouse button is clicked
     * @param {MouseEvent} event - The mouse event
     */
    startPan(event) {
        this.panStart = {
            x: event.clientX,
            y: event.clientY
        };
        if(event.button === 1) event.preventDefault();
    }

    /**
     * Pan the canvas based on mouse movement
     * @param {MouseEvent} event - The mouse event
     */
    pan(event) {
        if (this.panStart) {
            const deltaX = event.clientX - this.panStart.x;
            const deltaY = event.clientY - this.panStart.y;

            this.camPos.x += deltaX ;
            this.camPos.y += deltaY;

            this.drawnMap.x = (this.app.renderer.width - this.map.width * this.map.pixelWidth) / 2 + this.camPos.x;
            this.drawnMap.y = (this.app.renderer.height - this.map.height * this.map.pixelHeight) / 2 + this.camPos.y;

            this.panStart = {
                x: event.clientX,
                y: event.clientY
            };
        }
    }

    /**
     * Stop panning when the middle mouse button is released
     */
    stopPan() {
        this.panStart = null;
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
        let pixelSizeX = this.map.pixelWidth;
        let pixelSizeY = this.map.pixelHeight;
        this.drawnMap.beginFill(PIXI.utils.rgb2hex([pixel.r / 255, pixel.g / 255, pixel.b / 255]));
        this.drawnMap.drawRect(pixel.x * pixelSizeX, pixel.y * pixelSizeY, pixelSizeX, pixelSizeY);
        this.drawnMap.endFill();
    }

    handleClickEvent(event) {
        if (event.button === 0) {
            let mousePositions = this.getPixelXY(event);
            let x = mousePositions.gridX;
            let y = mousePositions.gridY;
            let newPixel = new Pixel(x, y, 0, 0, 0);
            this.map.map[x][y] = newPixel;
            this.drawPixel(newPixel);
    
            Api.sendPixelToServer(newPixel, this.map.mapId);
        }
    }
    

    updatePixelDrawer(event) {
        let mousePositions = this.getPixelXY(event);
    
        console.log("Relative Coordinates:", mousePositions.mouseX, mousePositions.mouseY);
        console.log("Grid Coordinates:", mousePositions.gridX, mousePositions.gridY);

        this.pixelBorder.clear();
        this.pixelBorder.lineStyle(2, 0x000000);
        this.pixelBorder.drawRect(
            mousePositions.gridX * this.map.pixelWidth,
            mousePositions.gridY * this.map.pixelHeight,
            this.map.pixelWidth,
            this.map.pixelHeight
        );
        this.drawnMap.addChild(this.pixelBorder);
    }

    getPixelXY(event){
        const mouseX = (event.data.global.x - this.drawnMap.x) / this.scale.y;
        const mouseY = (event.data.global.y - this.drawnMap.y) / this.scale.x;
        const gridX = Math.floor(mouseX / this.map.pixelWidth);
        const gridY = Math.floor(mouseY / this.map.pixelHeight);
        return {mouseX: mouseX, mouseY: mouseY, gridX: gridX, gridY: gridY}
    }

    removePixelDrawer(event){
        this.pixelBorder.clear();
    }
        

}