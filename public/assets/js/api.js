class Api {


    static getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /**
     * 
     * Do an API call to the database to get the PixelMap for the board
     * 
     */
    static getPixelMap(mapId) {
        const apiUrl = `https://startup.pixelatedplace.com/api/v1/map/${mapId}`;

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
        const apiUrl = `https://startup.pixelatedplace.com/api/v1/map/${mapId}`;

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
     * @returns {Promise}
     */
    static async handleAuth(username, password) {
        console.log("Authenticating: ", username, " ", password);
        const apiUrl = 'https://startup.pixelatedplace.com/api/v1/user/auth';

        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    reject("Incorrect username and password combination...");
                    return;
                }

                const data = await response.json();
                resolve({data});
            } catch (error) {
                reject("Error during authentication.");
            }
        });
    }

    /**
     * Resolves with the user info and puts the user info into local storage
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise}
     */
    static async handleRegistration(username, password) {
        console.log("Registering: ", username, " ", password);
        const apiUrl = 'https://startup.pixelatedplace.com/api/v1/user/register';

        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    reject("Registration failed.");
                    return;
                }

                const data = await response.json();
                resolve({data});
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Get user data from auth token
     */
    static async grabUserData(){
        const apiUrl = 'https://startup.pixelatedplace.com/api/v1/user/user';

        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: "same-origin"
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                });
                console.log(response);
                resolve(response);
            }catch (error) {
                reject(error);
            }
        });
        
    }


    /**
     * Puts random colors into the game bar
     * @returns Promise
     */
    static async loadRandomColors() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("https://www.thecolorapi.com/random?format=json", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                const url = response.url;

                // This is weird because it gives me a redirect
                var hexIndex = url.indexOf("hex=");
                var hexValue = url.substring(hexIndex + 4);

                resolve(hexValue);

            } catch (error) {
                reject(error);
            }
        });
    }



}