const storedPixelMaps = require("./storedPixelMap");
const { Pixel } = require('../models/pixel');

function generateTempMap(mapId){
    let map = [];
    let pixelToMap = getMapByMapId(mapId);
    console.log(pixelToMap)

    let tempWidth = pixelToMap[0].length;
    let tempHeight = pixelToMap.length;

    for (let width = 0; width < tempWidth; width += 1) {
        map[width] = [];
        for(let height = 0; height < tempHeight; height += 1){

            let newPixel = pixelToMap[width][height];

            map[width][height] = new Pixel(width,height,newPixel.r,newPixel.g,newPixel.b)
        }
    }
    return map;
}

function getMapByMapId(mapId){
    if(mapId == "largeMeatWizards"){
        let tempMap = storedPixelMaps.largeMeatWizards();
        return storedPixelMaps.convert1Dto2Darray(tempMap,300,300);
    }else if(mapId == "smallMeatWizards"){
        let tempMap = storedPixelMaps.meatWizards();
        return storedPixelMaps.convert1Dto2Darray(tempMap,100,100);
    }else{
        let tempMap = storedPixelMaps.pixelsForNewMap();
        return storedPixelMaps.convert1Dto2Darray(tempMap,100,100);
    }
}

module.exports = {generateTempMap};