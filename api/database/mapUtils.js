const { AuthToken } = require("./authToken");
const { MongoClient } = require('mongodb');
const { Pixel } = require("../controllers/map/models/pixel");
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

const MAP_NAME = "MAP_V1";
const mapCollection = client.db(MAP_NAME).collection("pixels");
const mapCollectionData = client.db(MAP_NAME).collection("data");
/**
 * This will select all pixels
 */
const getBoard = async () => {
    try {
        const pixels = await mapCollection.find({}).toArray();
        const data = await mapCollectionData.find({}).toArray();
        return {pixels, data};
    } catch (error) {
        console.error("Error occurred while fetching pixels:", error);
        throw error;
    }
}

/**
 * This is where we initalize the board with pixels
 */
const initBoard = async () => {
    const MAP_WIDTH = 100;
    const MAP_HEIGHT = 100;
    // for(let x = 0; x < MAP_WIDTH; x++){
    //     for(let y = 0; y < MAP_HEIGHT; y++){
    //         let pixel = new Pixel(x,y,255,255,255);
    //         mapCollection.insertOne(pixel);
    //     }
    // }
    mapCollectionData.insertOne({ width: MAP_WIDTH, height: MAP_HEIGHT });
}

/**
 * Update a pixel in the database
 * @param {Pixel} pixel - The pixel object to update
 */
const updatePixel = async (pixel) => {
    try {
        const filter = { x: pixel.x, y: pixel.y };
        const updateDoc = {
            $set: {
                r: pixel.r,
                g: pixel.g,
                b: pixel.b,
            }
        };
        await mapCollection.updateOne(filter, updateDoc);
        console.log("Pixel updated successfully.");
    } catch (error) {
        console.error("Error occurred while updating pixel:", error);
        throw error;
    }
}

module.exports = { updatePixel, initBoard, getBoard };