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
    setInterval(() => currentGame.updateMapFromApi(), 1000);

    const colorDivs = document.querySelectorAll('.color');
    colorDivs.forEach(colorDiv => {
        colorDiv.addEventListener('click', function () {
            const hexCode = this.classList[1].split('-')[1];
            selectedColor = `#${hexCode}`;
            console.log('Selected Color:', selectedColor);
        });
    });
});

window.onload = async function () {

    await Api.loadRandomColors().then((colors) => {
        colors.forEach((color) => {
            appendColorDivToGameBar(color);
        });
    });
    function appendColorDivToGameBar(hexColor) {
        const newDiv = document.createElement('div');
        newDiv.className = `color color-${hexColor}`;
        newDiv.style.backgroundColor = `#${hexColor}`;
        const gameBar = document.querySelector('.game-bar');
        gameBar.appendChild(newDiv);
    }

};