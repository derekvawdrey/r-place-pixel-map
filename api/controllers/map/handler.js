const tempMap = require("./helpers/generatePremadeMap");
const Pixel = require("./models/pixel");
const pixelHelper = require("./helpers/pixelHelper");
var map = tempMap.generateTempMap("pixelsForNewMap");
const {isAuthenticated} = require("../../database/authUtils");

/**
 * 
 * Grabs a 2d map of Pixel objects
 * @param {*} req 
 * @param {*} res 
 */
const grabMap = async (req, res) => {
    res.send(map);
}

/**
 * Takes a Pixel object from post and modifies the map
 * @param {*} req 
 * @param {*} res 
 */
const drawPixel = async (req, res) => {
    const authToken = req.cookies['token'];
    const authed = await isAuthenticated(authToken);
    if(authed){
        try {
            const { x, y, r, g, b } = req.body;
            
            if (pixelHelper.isValidPixelData(x, y, r, g, b)) {
                const pixel = new Pixel.Pixel(x, y, r, g, b);
                console.log("Valid - ", x,y,r,g,b);
                map[x][y] = pixel;
                res.send(map);
            } else {
                console.log("Invalid - ", x,y,r,g,b);
                res.status(400).send("Invalid pixel data");
            }
        } catch (error) {
            console.error("Error drawing pixel:", error);
            res.status(500).send("Internal Server Error");
        }
    }else{
        res.status(500).send("Unauthenticated");
    }
}




module.exports = { grabMap, drawPixel };