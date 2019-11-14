class DatabaseFacade {
    constructor(db, crypto) {
        this.db = db;
        this.crypto = crypto;
    }

    newUser(firstName, lastName, email, password) {
        let salt = this.crypto.randomFillSync(Buffer.alloc(32)).toString('hex');
        let hashed = this.crypto.createHash('sha256').update(password + salt).digest('hex');
        return this.db['User'].create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            salt: salt,
            hash: hashed
        });
    }

    verifyUser(email, password) {
        return new Promise(((resolve, reject) => {
            this.db['User'].findAll({
                where: {
                    email: email
                }
            }).then(users => {
                if (users.length === 1) {
                    const foundUser = users[0];
                    resolve (foundUser.hash === this.crypto.createHash('sha256').update(password + foundUser.salt).digest('hex'));
                } else {
                    if (users.length) console.error(`MORE THAN ONE USER WITH ${email} EMAIL`);
                    resolve(false);
                }
            }).catch(err => reject(err));
        }));
    }
}

module.exports = DatabaseFacade;