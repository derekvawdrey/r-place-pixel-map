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
    
    let loginSubmit = document.getElementById("login_submit");
    loginSubmit.addEventListener('click', () => {
        login();
    })
    
});

async function login(){
    let username = document.getElementById("login_name");
    let password = document.getElementById("login_password");

    let response = await Api.handleAuth(username,password);
}

function isLoggedIn(){
    let loggedIn = localStorage.getItem("user") ? true : false;
    return loggedIn;
}