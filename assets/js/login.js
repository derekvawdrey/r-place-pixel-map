async function login(){
    let response = await Api.handleAuth();
}

function isLoggedIn(){
    let loggedIn = localStorage.getItem("user") ? true : false;
    return loggedIn;
}