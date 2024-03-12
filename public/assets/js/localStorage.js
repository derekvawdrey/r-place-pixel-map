/**
 * 
 * 
 * 
 */
function setUserToken(authToken){
    console.log("Setting user token as: ",authToken)
    localStorage.setItem("authToken", authToken);
}

/**
 * 
 * 
 * 
 */
function getUserToken(){
    return localStorage.getItem("authToken");
}



function setUsername(username){
    localStorage.setItem("username", username);
}

function getUsername(){
    return localStorage.getItem("username");
}

/**
 * 
 * 
 * 
 */
function setMap(map){
    localStorage.setItem("map", map);
}

/**
 * 
 * 
 * 
 */
function getMap(){
    return localStorage.getItem("map")
}