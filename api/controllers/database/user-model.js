class User {
    username;
    jwt;

    constructor(username, jwt){
        this.username = username;
        this.jwt = jwt;
    }
}

module.export = {User};