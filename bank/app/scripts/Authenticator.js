class Authenticator {
    constructor(crypto) {
        this.crypto = crypto;
        this.authenticated = {};
    }

    authenticate(user, timeout, admin) {
        let token = this.crypto.randomFillSync(Buffer.alloc(64)).toString('hex');
        while (this.authenticated[token]) {
            token = this.crypto.randomFillSync(Buffer.alloc(64)).toString('hex');
        }
        this.authenticated[token] = {
            timestamp: Date.now(),
            timeout: timeout * 1000,
            user: user,
            admin: admin
        };
        return token;
    }

    authorize(token) {
        let storedUser = this.authenticated[token];
        if (storedUser === undefined) return false;
        if (storedUser.timestamp + storedUser.timeout < Date.now()) {
            delete this.authenticated[token];
            return {
                passed: false,
                user: null,
                admin: false
            };
        } else {
            return {
                passed: true,
                user: storedUser.user,
                admin: storedUser.admin
            };
        }
    }

    deauthenticate(token) {
        if (this.authenticated[token]) delete this.authenticated[token];
    }
}

module.exports = Authenticator;