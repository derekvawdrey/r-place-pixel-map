class User {
    username;
    authToken;
    password;

    constructor(username, authToken){
        this.username = username;
        this.authToken = authToken;
        this.password = password;
    }
}

module.export = {User};