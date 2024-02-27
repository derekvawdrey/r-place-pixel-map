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
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(localStorage.getItem("map") !== null){
                    resolve(JSON.parse(localStorage.getItem("map")))
                }else{
                    let map = [];
                    // Temporary map stored on the 'server'
                    let pixelToMap = meatWizards();
                    for (let width = 0; width < 100; width += 1) {
                        map[width] = [];
                        for(let height = 0; height < 100; height += 1){

                            let newPixel = pixelToMap[width+height*100];

                            map[width][height] = new Pixel(width,height,newPixel.r,newPixel.g,newPixel.b)
                        }
                    }

                    localStorage.setItem("map-"+mapId, JSON.stringify(map));
                    resolve(map);
                }
            }, 300);
          });
    }

    static async sendPixelToServer(pixel, mapId){
        this.getPixelMap().then((map)=>{
            if(pixel.x <= 99 && pixel.y <= 99){
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