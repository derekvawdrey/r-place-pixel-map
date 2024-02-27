document.addEventListener('DOMContentLoaded', () => {
    
    if(isLoggedIn()){
        let loginLink = document.getElementById("loginLink");
        let registerLink = document.getElementById("registerLink");
        if(loginLink){
            loginLink.classList.add("hidden");
            registerLink.classList.add("hidden");
        }
    }else{
        let profileLink = document.getElementById("profileLink");
        profileLink.classList.add("hidden");
    }
    
    
});

function login(){
    let username = document.getElementById("login-name").value;
    let password = document.getElementById("login-password").value;
    let errorMessageElement = document.getElementById("login-error");

    let response = Api.handleAuth(username,password);
    response.then((data)=>{
        console.log(data);
        setUserToken(data);
        errorMessageElement.innerText = "";
    }).catch((error)=>{
        console.log(error);
        errorMessageElement.innerText = error;
    });
}

async function register(){

};

function logout(){
    setUserToken(null);
}

function isLoggedIn(){
    let loggedIn = getUserToken() ? true : false;
    return loggedIn;
}