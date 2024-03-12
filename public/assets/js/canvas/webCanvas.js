
class pixelatedCanvas {
    gameHolder
    app
    zoom
    camPos
    scale
    map
    drawnMap
    pixelBorder
    initalized
    isDrawDrag

    previouxX
    previouxY

    // THis is a tap timer to determine if we need to put a pixel or not
    tapTimer

    /**
     * 
     * @param {Element} gameHolder 
     * @param {PixelatedMap} map 
     * @returns 
     */
    constructor(gameHolder, map) {
        this.gameHolder = gameHolder;
        this.map = map;
        this.initalized = false;
        this.tapTimer = 0;


        // For drag
        this.isDrawDrag = false;
        this.previousX = 0;
        this.previousY = 0;

        this.app = new PIXI.Application({
            background: '#EEE',
            resizeTo: window,
        });



        if (this.gameHolder == null) {
            console.log("ERROR: webgl cannot load");
            return;
        }

        if (this.map == null) {
            console.log("ERROR: Map doesn't exist!");
            return;
        }


        this.drawnMap = new PIXI.Graphics();
        this.drawnMap.interactive = true;

        this.drawnMap.x = (this.app.renderer.width - this.map.width * this.map.pixelWidth) / 2;
        this.drawnMap.y = (this.app.renderer.height - this.map.height * this.map.pixelHeight) / 2;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this.pixelBorder = new PIXI.Graphics();


        //Append the game holder to the canvas screen
        this.gameHolder.append(this.app.view);

        this.app.stage.addChild(this.drawnMap);

        this.zoom = { x: 1.00, y: 1.00 }
        this.scale = { x: 1.00, y: 1.00 }
        this.camPos = { x: 0.00, y: 0.00 }

        this.drawMapToCanvas();
        this.initializeDrawEvents();
        this.initializeZoomEvents();
        this.initalizePanningEvents();
        this.initializeTouchEvents();
        this.fetchMapUpdates();
        this.initalized = true;

    }


    /**
     * Draws the map to the canvas
     */
    drawMapToCanvas() {
        this.drawnMap.clear();
        if (!this.map) {
            console.log("ERROR: Map doesn't exist!")
            return;
        }


        for (let col = 0; col < this.map.width; col += 1) {
            for (let row = 0; row < this.map.height; row += 1) {
                let pixel = this.map.map[col][row];
                this.drawPixel(pixel);
            }
        }
    }

    /**
     * 
     * 
     */
    fetchMapUpdates() {
        // Get an array of pixels, draw them onto the board

    }

    /**
     * 
     * @param {Pixel} pixel
     *  
     */
    drawPixel(pixel) {
        this.drawnMap.beginFill(PIXI.utils.rgb2hex([pixel.r / 255, pixel.g / 255, pixel.b / 255]));
        this.drawnMap.drawRect(pixel.x * this.map.pixelWidth, pixel.y * this.map.pixelHeight, this.map.pixelWidth, this.map.pixelHeight);
        this.drawnMap.endFill();
    }



    getPixelXY(event) {
        if (event instanceof Touch) {
            const mouseX = (event.clientX - this.drawnMap.x) / this.scale.y;
            const mouseY = (event.clientY - this.drawnMap.y) / this.scale.x;
            const gridX = Math.floor(mouseX / this.map.pixelWidth);
            const gridY = Math.floor(mouseY / this.map.pixelHeight);
            return { mouseX: mouseX, mouseY: mouseY, gridX: gridX, gridY: gridY }
        }else{
            const mouseX = (event.data.global.x - this.drawnMap.x) / this.scale.y;
            const mouseY = (event.data.global.y - this.drawnMap.y) / this.scale.x;
            const gridX = Math.floor(mouseX / this.map.pixelWidth);
            const gridY = Math.floor(mouseY / this.map.pixelHeight);
            return { mouseX: mouseX, mouseY: mouseY, gridX: gridX, gridY: gridY }
        }
    }





    /**
     * 
     * 
     * EVENTS!!!!!
     * 
     * 
     */

    /**
     * 
     * MOBILE EVENTS
     * 
     * 
     */



    initializeTouchEvents() {
        this.app.view.addEventListener("touchstart", (event) => this.handleTouchStart(event));
        this.app.view.addEventListener("touchmove", (event) => this.handleTouchMove(event));
        this.app.view.addEventListener("touchend", (event) => this.handleTouchEnd(event));
    }

    handleTouchStart(event) {
        this.tapTimer = 0;
        if (event.touches.length === 1) {
            // Single touch, start panning
            this.startPan(event.touches[0]);
        } else if (event.touches.length === 2) {
            // Two touches, start pinch-to-zoom
            this.startPinch(event.touches[0], event.touches[1]);
        }
    }

    handleTouchMove(event) {
        this.tapTimer += 1;
        if (event.touches.length === 1) {
            // Single touch, pan the canvas
            this.pan(event.touches[0]);
        } else if (event.touches.length === 2) {
            // Two touches, perform pinch-to-zoom
            this.pinchZoom(event.touches[0], event.touches[1]);
        }
    }

    handleTouchEnd(event) {
        if (this.tapTimer < 5) {
            // Draw pixel
            this.handleClickEvent(event);
            console.log("Tapping on mobile, draw pixel");
        }
        this.tapTimer = 0;

        // Stop panning when touch ends
        this.stopPan();
    }

    startPinch(touch1, touch2) {
        this.pinchStart = {
            distance: this.calculateDistance(touch1, touch2),
            center: this.calculateCenter(touch1, touch2),
        };
    } 

    pinchZoom(touch1, touch2) {
        this.tapTimer = 100;
        if (!this.pinchStart) {
            this.pinchStart = {
                distance: this.calculateDistance(touch1, touch2)
            };
        } else {
            const currentDistance = this.calculateDistance(touch1, touch2);
            const currentCenter = this.calculateCenter(touch1, touch2);
            const deltaDistance = currentDistance - this.pinchStart.distance;
            const scaleFactor = 1 + deltaDistance / this.app.renderer.width;

            const zoomPoint = new PIXI.Point(currentCenter.x, currentCenter.y);

            if (scaleFactor > 1) {
                this.zoomIn(scaleFactor, zoomPoint);
            } else {
                this.zoomOut(1 / Math.abs(scaleFactor), zoomPoint);
            }

            this.pinchStart.distance = currentDistance;
        }
    }

    calculateDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Calculates the center of where the pinch occured for zooming purposes
     * @param {*} touch1 
     * @param {*} touch2 
     * @returns 
     */
    calculateCenter(touch1, touch2) {
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        return { x: centerX, y: centerY };
    }


    /**
     * 
     * 
     * CLICKING EVENTS
     * 
     * 
     */

    /**
     * Initializes all the events for drawing
     */
    initializeDrawEvents() {
        this.drawnMap.on("pointerout", (event) => this.removePixelDrawer(event));
        this.drawnMap.on("mousemove", (event) => this.updatePixelDrawer(event));
        this.drawnMap.on("click", (event) => this.handleClickEvent(event));

        this.drawnMap.on('mousedown', (event) => this.enableDrawDrag(event));
        this.drawnMap.on('mouseup', (event) => this.enableDrawDrag(event));
    }

    /**
     * Draws a pixel on click or touchend
     * @param {Event} event 
     */
    enableDrawDrag(event){
        if(event.button === 0){
            this.isDrawDrag = true;
        }
    }

    /**
     * Draws a pixel on click or touchend
     * @param {Event} event 
     */
    disableDrawDrag(event){
        if(event.button === 0){
            this.isDrawDrag = false;
        }
    }


    /**
     * Draws a pixel on click or touchend
     * @param {Event} event 
     */
    handleClickEvent(event) {
        let mousePositions;

        if (event.type === 'click' && event.button === 0) {
            mousePositions = this.getPixelXY(event);
            this.isDrawDrag = false;
        } else if (event.type === 'touchend') {
            event.preventDefault();
            const touch = event.changedTouches[0];
            mousePositions = this.getPixelXY(touch);
            this.isDrawDrag = false;
        } else {
            return;
        }

        let x = mousePositions.gridX;
        let y = mousePositions.gridY;
        this.drawPixelToCanvas(x,y);

    }

    /**
     * Draws pixel on canvas and sends to Api
     * @param {*} x 
     * @param {*} y 
     */
    drawPixelToCanvas(x,y){
        const color = hexToRgb(selectedColor);

        let newPixel = new Pixel(x, y, color.r, color.g, color.b);
        this.map.map[x][y] = newPixel;
        this.drawPixel(newPixel);

        Api.sendPixelToServer(newPixel, this.map.mapId);
    }


    /**
     * Updates the position and drawing of the pixelBorder object
     * @param {MouseMove} event 
     */
    updatePixelDrawer(event) {
        let mousePositions = this.getPixelXY(event);
        const color = hexToRgb(selectedColor);
        this.pixelBorder.clear();
        this.pixelBorder.lineStyle(2, selectedColor);
        this.pixelBorder.drawRect(
            mousePositions.gridX * this.map.pixelWidth,
            mousePositions.gridY * this.map.pixelHeight,
            this.map.pixelWidth,
            this.map.pixelHeight
        );
        this.drawnMap.addChild(this.pixelBorder);

        if(this.isDrawDrag && this.previousX != mousePositions.gridX && this.previousY != mousePositions.gridY){
            this.previousX = mousePositions.gridX;
            this.previousY = mousePositions.gridY;
            this.drawPixelToCanvas(mousePositions.gridX,mousePositions.gridY);
        }
    }

    /**
     * Removes the pxel drawing borad
     * @param {PointerOut} event 
     */
    removePixelDrawer(event) {
        this.pixelBorder.clear();
    }


    /**
     * 
     * 
     * ZOOMING EVENTS
     * 
     */

    /**
     * Initialize event listeners for zooming
     */
    initializeZoomEvents() {
        this.app.view.addEventListener("wheel", (event) => this.handleZoom(event));
    }


    /**
     * Zoom in by a factor around a specified point
     * @param {number} factor - The zoom factor
     * @param {PIXI.Point} zoomPoint - The point to zoom in on
     */
    zoomIn(factor, zoomPoint) {
        this.zoom.x *= factor;
        this.zoom.y *= factor;
        this.updateZoom(zoomPoint);
    }

    /**
     * Zoom out by a factor around a specified point
     * @param {number} factor - The zoom factor
     * @param {PIXI.Point} zoomPoint - The point to zoom out from
     */
    zoomOut(factor, zoomPoint) {
        this.zoom.x /= factor;
        this.zoom.y /= factor;
        this.updateZoom(zoomPoint);
    }

    /**
     * Update the zoom properties and redraw the map around a specified point
     * @param {PIXI.Point} zoomPoint - The point to zoom around
     */
    updateZoom(zoomPoint) {
        this.scale.x = this.zoom.x;
        this.scale.y = this.zoom.y;
        const currentPosition = this.drawnMap.getGlobalPosition();
        const currentScale = this.drawnMap.scale;

        const tx = (zoomPoint.x - currentPosition.x) / currentScale.x;
        const ty = (zoomPoint.y - currentPosition.y) / currentScale.y;
        this.drawnMap.setTransform(-tx * this.scale.x + zoomPoint.x, -ty * this.scale.y + zoomPoint.y, this.scale.x, this.scale.y);

        this.drawMapToCanvas();
    }


    /**
     * Handle mouse wheel event for zooming to the mouse position
     * @param {WheelEvent} event - The wheel event
     */
    handleZoom(event) {
        const zoomFactor = 1.1;
        const zoomPoint = new PIXI.Point(event.clientX, event.clientY);

        if (event.deltaY < 0) {
            // Zoom in when scrolling up
            this.zoomIn(zoomFactor, zoomPoint);
        } else {
            // Zoom out when scrolling down
            this.zoomOut(zoomFactor, zoomPoint);
        }

        event.preventDefault(true);
    }




    /**
     * 
     * PANNING EVENTS
     * 
     * 
     */



    /**
     * Initalize Panning events
     */
    initalizePanningEvents() {
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
     * Start panning the canvas
     * @param {Object} startEvent - The starting event for panning
     */
    startPan(startEvent) {
        this.panning = true;
        this.panStart = {
            x: startEvent.clientX,
            y: startEvent.clientY,
        };
        startEvent.preventDefault(true);
    }

    /**
     * Stop panning the canvas
     */
    stopPan() {
        this.panning = false;
    }

    /**
     * Update the canvas position during panning
     * @param {Object} panEvent - The current panning event
     */
    pan(panEvent) {
        if (this.panning) {
            const deltaX = panEvent.clientX - this.panStart.x;
            const deltaY = panEvent.clientY - this.panStart.y;

            this.drawnMap.x += deltaX;
            this.drawnMap.y += deltaY;

            this.panStart = {
                x: panEvent.clientX,
                y: panEvent.clientY,
            };
        }
    }

    /**
     * 
     */
    async updateMapFromApi(){
        await this.map.loadMap();
        this.drawMapToCanvas();
    }

}