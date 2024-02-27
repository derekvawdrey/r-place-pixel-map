class Api{

    /**
     * 
     * Do an API call to the database to get the PixelMap for the board
     * 
     */
    static async getPixelMap(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(localStorage.getItem("map") !== null){
                    resolve(localStorage.getItem("map"))
                }else{
                    let map = [];
                    for(width = 0; width < 100; width += 1){
                        for(height = 0; height < 100; height += 1){
                            map.append(new Pixel(x,y,0,0,0));
                        }
                    }

                    localStorage.setItem("map");
                    resolve(map);
                }
            }, 300);
          });
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

}