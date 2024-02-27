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

document.addEventListener("DOMContentLoaded", async function() {
    currentMap = new PixelatedMap(5,5,"smallMeatWizards");
    await currentMap.loadMap();

    currentGame = new pixelatedCanvas(
        document.getElementById("pixelCanvasAppend"),
        currentMap,
    );

    const colorDivs = document.querySelectorAll('.color');
    colorDivs.forEach(colorDiv => {
        colorDiv.addEventListener('click', function() {
            const hexCode = this.classList[1].split('-')[1];
            selectedColor = `#${hexCode}`;
            console.log('Selected Color:', selectedColor);
        });
    });
});