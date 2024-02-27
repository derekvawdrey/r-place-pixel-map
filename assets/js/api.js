class Api{


    static getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /**
     * 
     * Do an API call to the database to get the PixelMap for the board
     * 
     */
    static async getPixelMap(mapId){
        console.log("API CALL",mapId);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(localStorage.getItem("map-"+mapId) !== null){
                    resolve(JSON.parse(localStorage.getItem("map-"+mapId)))
                }else{
                    let map = [];
                    // Temporary map stored on the 'server'
                    // This part will be done in the backend:
                    let pixelToMap = this.getMapByMapId(mapId);
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

                    localStorage.setItem("map-"+mapId, JSON.stringify(map));
                    resolve(map);
                }
            }, 300);
          });
    }
    
    static getMapByMapId(mapId){
        if(mapId == "largeMeatWizards"){
            let tempMap = largeMeatWizards();
            return convert1Dto2Darray(tempMap,300,300);
        }else if(mapId == "smallMeatWizards"){
            let tempMap = meatWizards();
            return convert1Dto2Darray(tempMap,100,100);
        }else{
            let tempMap = pixelsForNewMap();
            return convert1Dto2Darray(tempMap,100,100);
        }
    }

    static async sendPixelToServer(pixel, mapId){
        this.getPixelMap(mapId).then((map)=>{
            if(pixel.x < map[0].length && pixel.y <= map.length){
                map[pixel.x][pixel.y] = pixel;
                localStorage.setItem("map-"+mapId, JSON.stringify(map));
                console.log(pixel);
            }
        })
    }



    /**
     * Resolves with the user info and puts the user info into local storage
     * @param {string} username 
     * @param {string} password 
     *
     */
    static async handleAuth(username, password){
        console.log("Authenticating: ", username, " ", password);
        return new Promise((resolve,reject) => {
            if (username == "user" && password == "password"){
                resolve("Usertokenhere");
            }else{
                
                reject("Incorrect username and password combination... (Try username:user and password:password)");
            }
        });
    }

    static async handleRegistration(username, password){
        console.log("Registering: ", username, " ", password);
        return new Promise((resolve,reject) => {
            resolve("TOKEN HERE");
        });
    }

}