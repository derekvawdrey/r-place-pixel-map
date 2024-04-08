var currentGame;
var currentMap;
var selectedColor = "#000";

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return { r, g, b };
}

function convert1Dto2Darray(array, width, height) {
    let newArray = []
    for (let col = 0; col < width; col += 1) {
        newArray[col] = [];
        for (let row = 0; row < height; row += 1) {
            newArray[col][row] = array[col + row * width]
        }
    }
    return newArray;
}

document.addEventListener("DOMContentLoaded", async function () {
    currentMap = new PixelatedMap(5, 5, "smallMeatWizards");
    await currentMap.loadMap();

    currentGame = new pixelatedCanvas(
        document.getElementById("pixelCanvasAppend"),
        currentMap,
    );

    // setInterval(() => currentGame.updateMapFromApi(), 2000);

});

window.onload = async function () {
    for(let i = 0; i < 15; i++){
        await Api.loadRandomColors().then((color) => {
                appendColorDivToGameBar(color);
        });
    }
    function appendColorDivToGameBar(hexColor) {
        const newDiv = document.createElement('div');
        newDiv.className = `color color-${hexColor}`;
        newDiv.style.backgroundColor = `#${hexColor}`;

        newDiv.addEventListener('click', function () {
            const hexCode = this.classList[1].split('-')[1];
            selectedColor = `#${hexCode}`;
            console.log('Selected Color:', selectedColor);
        });

        const gameBar = document.querySelector('.game-bar');
        gameBar.appendChild(newDiv);
    }

};

const ws = new WebSocket('wss://startup.pixelatedplace.com');

ws.onopen = function() {
  console.log('Connected to WebSocket server');
};
ws.onmessage = function(event) {
    console.log('Received message:', event.data);
    try {
      const eventData = JSON.parse(event.data); // Parse event data if it's a JSON string
      let pixel = new Pixel(eventData.x, eventData.y, eventData.r, eventData.g, eventData.b);
      currentGame.drawClientsidePixel(pixel);
    } catch (error) {
      console.error('Error parsing or creating Pixel:', error);
    }
  };
  

ws.onclose = function() {
  console.log('Connection to WebSocket server closed');
};

ws.onerror = function(error) {
  console.error('WebSocket error:', error);
};