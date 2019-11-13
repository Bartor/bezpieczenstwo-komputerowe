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

    findUser(id, password) {
        return new Promise(((resolve, reject) => {
            this.db['User'].findAll({
                where: {
                    id: id
                }
            }).then(users => resolve(users)).catch(err => reject(err));
        }));
    }
}

module.exports = DatabaseFacade;