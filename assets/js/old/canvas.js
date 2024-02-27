var selectedColor = '#000';

var canvas_x = 0;
var canvas_y = 0;
var canvas_width = 100;
var canvas_height = 100;


document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pixelCanvas');
    const ctx = canvas.getContext("2d");

    let ratio = window.devicePixelRatio;
    const gridSize = 5;
    setupCanvasDim();
    drawCanvas();



    window.addEventListener('resize', function () {
        setupCanvasDim();
        drawCanvas();
    });

    function setupCanvasDim() {
        ratio = window.devicePixelRatio;
        canvas.style.width ='100%';
        canvas.style.height='100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.scale(ratio, ratio);
    }
    
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#ccc';
        ctx.fillStyle = 'transparent';
        for (let i = 0; i < canvas_height * gridSize; i += gridSize) {
            for (let j = 0; j < canvas_width * gridSize; j += gridSize) {
                ctx.beginPath();
                ctx.rect(i, j, gridSize, gridSize);
                ctx.stroke();
            }
        }
    }

    async function drawCanvas(){
        drawGrid();
        // Draw pixels
        let map = await Api.getPixelMap();
        for (var i = 0; i < map.length; i++) {
            var row = map[i];
            for (var j = 0; j < row.length; j++) {
                var element = row[j];
                drawPixel(element);
            }
        }

        
    }

    /**
     * 
     * TODO: Add future Websocket here
     */
    function updateCanvas(){
        
    }

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return { r, g, b };
    }


    function drawPixel(pixel){
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(pixel.x * gridSize);
        const y = Math.floor(pixel.y * gridSize);

        ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;    
        ctx.fillRect(x, y, gridSize, gridSize);
    }

    canvas.addEventListener('click', async function (event) {
        const x = Math.floor(event.clientX/(gridSize*ratio));
        const y = Math.floor(event.clientY/(gridSize*ratio));
        console.log(x,y)
        const color = hexToRgb(selectedColor);
        let pixel = new Pixel(x,y,color.r,color.g,color.b);
        drawPixel(pixel);
        await Api.sendPixelToServer(pixel);
    });
    

    
    const colorDivs = document.querySelectorAll('.color');
    colorDivs.forEach(colorDiv => {
        colorDiv.addEventListener('click', function() {
            const hexCode = this.classList[1].split('-')[1];
            selectedColor = `#${hexCode}`;
            console.log('Selected Color:', selectedColor);
        });
    });

});
