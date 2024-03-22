class User {
    username;
    authToken;
    password;

    constructor(username, password, authToken){
        this.username = username;
        this.authToken = authToken;
        this.password = password;
    }
}

module.exports = {User};