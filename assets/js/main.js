var currentGame;
var currentMap;

document.addEventListener("DOMContentLoaded", async function() {
    currentMap = new PixelatedMap(5,5,"largeMeatWizards");
    await currentMap.loadMap();

    currentGame = new pixelatedCanvas(
        document.getElementById("pixelCanvasAppend"),
        currentMap,
    );
});