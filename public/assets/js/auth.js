document.addEventListener('DOMContentLoaded', () => {
    

    updateProfileText();
    
    
});

function updateProfileText(){
    let response = Api.grabUserData();
    response.then((username)=>{
        console.log(username);
        let loginLink = document.getElementById("loginLink");
        let registerLink = document.getElementById("registerLink");
        let usernameText = document.getElementById("username");
        let logoutLink = document.getElementById("logoutLink");
        console.log("Updating nav");
        if(loginLink){
            loginLink.classList.add("hidden");
            registerLink.classList.add("hidden");

        }
        if(username){
            usernameText.innerText = username;
            profileLink.classList.remove("hidden");
        }
        if(logoutLink){
            logoutLink.classList.remove("hidden");
        }

    }).catch((error)=>{
        let profileLink = document.getElementById("profileLink");
        profileLink.classList.add("hidden");
    });

}


function login(){
    let username = document.getElementById("login-name").value;
    let password = document.getElementById("login-password").value;
    let errorMessageElement = document.getElementById("login-error");

    let response = Api.handleAuth(username,password);
    response.then((data)=>{
        errorMessageElement.innerText = "";
        closeModal();
        updateProfileText();
    }).catch((error)=>{
        console.log(error);
        errorMessageElement.innerText = error;
    });
}

async function register(){
    let username = document.getElementById("register-name").value;
    let password = document.getElementById("register-password").value;
    let errorMessageElement = document.getElementById("register-error");

    let response = Api.handleRegistration(username,password);
    response.then(()=>{
        errorMessageElement.innerText = "";
        closeModal();
        updateProfileText();
    }).catch((error)=>{
        console.log(error);
        errorMessageElement.innerText = error;
    });
};

function logout(){
    deleteAllCookies();
    window.location.reload();
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}