var currentGame;
var currentMap;

document.addEventListener("DOMContentLoaded", async function() {
    currentMap = new PixelatedMap(10,10,"largeMeatWizards");
    await currentMap.loadMap();

    currentGame = new pixelatedCanvas(
        document.getElementById("pixelCanvasAppend"),
        currentMap,
    );
});