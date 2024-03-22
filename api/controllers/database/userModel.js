class User {
    username;
    jwt;
    password;

    constructor(username, jwt){
        this.username = username;
        this.jwt = jwt;
        this.password = password;
    }
}

module.export = {User};