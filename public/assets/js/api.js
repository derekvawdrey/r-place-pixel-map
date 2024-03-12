class Api{


    static getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /**
     * 
     * Do an API call to the database to get the PixelMap for the board
     * 
     */
    static getPixelMap(mapId) {
        const apiUrl = `http://localhost:3000/api/v1/map/${mapId}`;
    
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    reject(`Error: ${response.status} - ${response.statusText}`);
                }
    
                const data = await response.json();
                resolve(data);
            } catch (error) {
                reject(`Fetch error: ${error.message}`);
            }
        });
    }
    
    static async sendPixelToServer(pixel, mapId) {
        const apiUrl = `http://localhost:3000/api/v1/map/${mapId}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pixel),
            });

            if (!response.ok) {
                throw new Error(`Error sending pixel to server: ${response.statusText}`);
            }

            const updatedMap = await response.json();
            return updatedMap;
        } catch (error) {
            console.error('Error sending pixel to server:', error);
            throw error; // Rethrow the error for further handling if needed
        }
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
            if (username.length != 0 && password.length != 0){
                resolve({username:username, auth_token:"asdasdasdasd"});
            }else{
                
                reject("Incorrect username and password combination... (Try username:user and password:password)");
            }
        });
    }

    static async handleRegistration(username, password){
        console.log("Registering: ", username, " ", password);
        return new Promise((resolve,reject) => {
            resolve({username:username, auth_token:"asdasdasdasd"});
        });
    }

}