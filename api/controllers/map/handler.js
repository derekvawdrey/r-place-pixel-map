/**
 * 
 * 
 * @param {*} req 
 * @param {*} res 
 */

const storedPixelMaps = require("./helpers/storedPixelMap");
const { Pixel } = require('./models/pixel');

let map = [];
generateTempMap("largeMeatWizards");

function generateTempMap(mapId){
    // This part will be done in the backend:
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

const grabMap = async (req, res) => {
    res.send(map);
}

module.exports = { grabMap }