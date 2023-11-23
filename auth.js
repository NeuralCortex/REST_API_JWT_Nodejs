let { jwtDecode } = require("jwt-decode");

class Auth {
    constructor() {
        this.authenticated = false;
        this.token = "";
    }

    login(token) {
        this.token = token;
        this.authenticated = true;
    }

    isAuthenticated() {
        return this.authenticated;
    }

    getToken() {
        return this.token;
    }

    getBearerToken() {
        return "Bearer " + this.token;
    }

    //show the additional data which is transported by the token to the client
    getTokenJson() {
        return jwtDecode(this.token);
    }
    
    hasRole(scope) {
        let token = this.getTokenJson();
        let roles = JSON.parse(token.roles);
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === scope) {
                return true;
            }
        }
        return false;
    }
}

module.exports = Auth;