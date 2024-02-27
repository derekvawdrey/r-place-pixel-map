var currentGame;
var currentMap;

document.addEventListener("DOMContentLoaded", function() {
    currentMap = new PixelatedMap(100,100,5,5,convert1Dto2Darray(meatWizards(),100,100),"meatWizards");

    currentGame = new pixelatedCanvas(
        document.getElementById("pixelCanvasAppend"),
        currentMap,
    );
});