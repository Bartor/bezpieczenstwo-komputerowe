class Authenticator {
    constructor(crypto) {
        this.crypto = crypto;
        this.authenticated = {};
    }

    authenticate(user, timeout) {
        let token = this.crypto.randomFillSync(Buffer.alloc(64)).toString('hex');
        this.authenticated[user] = {
            timestamp: Date.now(),
            timeout: timeout*1000,
            token: token
        };
        return token;
    }

    authorize(user, token) {
        let storedUser = this.authenticated[user];
        if (storedUser === undefined) return false;
        if (storedUser.timestamp + storedUser.timeout < Date.now()) {
            delete this.authenticated[user];
            return false;
        } else {
            return storedUser.token === token;
        }
    }

    deauthenticate(user) {
        if (this.authenticated[user]) delete this.authenticated[user];
    }
}

module.exports = Authenticator;