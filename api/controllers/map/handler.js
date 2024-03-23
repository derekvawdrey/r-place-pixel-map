const Pixel = require("./models/pixel");
const pixelHelper = require("./helpers/pixelHelper");
const { updatePixel, initBoard, getBoard } = require("../../database/mapUtils");
const {isAuthenticated} = require("../../database/authUtils");
const connections = require("../../../index.js")

/**
 * 
 * Grabs a 2d map of Pixel objects
 * @param {*} req 
 * @param {*} res 
 */
const grabMap = async (req, res) => {
    try {
        let mapData = await getBoard(); // Await the asynchronous function call
        res.send({map: mapData.pixels, data: mapData.data});
    } catch (error) {
        console.error("Error occurred while grabbing map:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}


const sendPixelToWebsockets = (pixel) => {
    console.log(connections);
    connections.forEach((client)=>{
        client.ws.send(JSON.stringify(pixel)); 
        console.log("Sending pixel", pixel);
    });
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
                updatePixel(pixel);


                sendPixelToWebsockets(pixel);



                res.status(200).send({ msg: "Pixel updated" });
            } else {
                console.log("Invalid - ", x,y,r,g,b);
                res.status(400).send({ error: "Invalid Pixel Data" });
            }
        } catch (error) {
            console.error("Error drawing pixel:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }else{
        res.status(500).send("Unauthenticated");
    }
}

/**
 * Initalizes map
 */
const initMap = async(req, res) => {
    await initBoard();
    res.status(200).send({ msg: "Initalized Board" });
}



module.exports = { grabMap, drawPixel, initMap };