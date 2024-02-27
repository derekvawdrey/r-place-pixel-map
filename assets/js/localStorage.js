/**
 * 
 * 
 * 
 */
function setUserToken(authToken){
    localStorage.setItem("user-token", authToken);
}

/**
 * 
 * 
 * 
 */
function getUserToken(){
    localStorage.getItem("user-token");
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