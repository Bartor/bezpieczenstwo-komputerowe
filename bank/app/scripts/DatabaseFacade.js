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
                    if (foundUser.hash === this.crypto.createHash('sha256').update(password + foundUser.salt).digest('hex')) {
                        resolve(foundUser.id);
                    } else {
                        resolve(false);
                    }
                } else {
                    if (users.length) console.error(`MORE THAN ONE USER WITH ${email} EMAIL`);
                    resolve(false);
                }
            }).catch(err => reject(err));
        }));
    }

    findUserByEmail(email) {
        return this.db['User'].findAll({
            where: {
                email: email
            }
        });
    }

    acceptTransfer(userId, transferId) {
        return this.db['Transfer'].update({
            status: 'accepted'
        }, {
            where: {
                status: 'pending',
                sender: userId,
                id: transferId
            }
        });
    }

    cancelTransfer(userId, transferId) {
        return this.db['Transfer'].update({
            status: 'cancelled'
        }, {
            where: {
                status: 'pending',
                sender: userId,
                id: transferId
            }
        });
    }

    getUserTransfers(userId) {
        return this.db.sequelize.query(`SELECT T.id, T.status, T.sender, T.receiver, T.amount, T.datetime, U.email as senderEmail, UU.email as receiverEmail FROM public."Transfers" T JOIN public."Users" U ON T.sender = U.id JOIN public."Users" UU on T.receiver = UU.id WHERE T.sender = :userId OR T.receiver = :userId`, {
            replacements: {userId: userId}, type: this.db.Sequelize.QueryTypes.SELECT
        });
    }

    getUserTransfer(userId, transferId) {
        return this.db.sequelize.query(`SELECT T.id, T.status, T.sender, T.receiver, T.amount, T.datetime, U.email as senderEmail, UU.email as receiverEmail FROM public."Transfers" T JOIN public."Users" U ON T.sender = U.id JOIN public."Users" UU on T.receiver = UU.id WHERE (T.sender = :userId OR T.receiver = :userId) AND T.id = :transferId`, {
            replacements: {userId: userId, transferId: transferId}, type: this.db.Sequelize.QueryTypes.SELECT
        });
    }

    newTransfer(sender, receiver, amount) {
        return this.db['Transfer'].create({
            sender: sender,
            receiver: receiver,
            amount: amount,
            datetime: new Date()
        });
    }
}

module.exports = DatabaseFacade;