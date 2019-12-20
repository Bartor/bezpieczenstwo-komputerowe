const uuidv4 = require('uuid/v4');

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

    acceptTransfer(userId, transferId, admin = false) {
        return this.db['Transfer'].update({
            status: 'accepted'
        }, {
            where: admin ? {
                id: transferId
            } : {
                status: 'pending',
                sender: userId,
                id: transferId
            }
        });
    }

    cancelTransfer(userId, transferId, admin = false) {
        return this.db['Transfer'].update({
            status: 'cancelled'
        }, {
            where: admin ? {
                id: transferId
            } : {
                status: 'pending',
                sender: userId,
                id: transferId
            }
        });
    }

    getUserTransfers(userId) {
        return this.db.sequelize.query(`SELECT T.id, T.title, T.status, T.sender, T.receiver, T.amount, T.datetime, U.email as senderEmail, UU.email as receiverEmail FROM public."Transfers" T JOIN public."Users" U ON T.sender = U.id JOIN public."Users" UU on T.receiver = UU.id WHERE T.sender = :userId OR T.receiver = :userId`, {
            replacements: {userId: userId}, type: this.db.Sequelize.QueryTypes.SELECT
        });
    }

    getUserTransfer(userId, transferId) {
        return this.db.sequelize.query(`SELECT T.id, T.title, T.status, T.sender, T.receiver, T.amount, T.datetime, U.email as senderEmail, UU.email as receiverEmail FROM public."Transfers" T JOIN public."Users" U ON T.sender = U.id JOIN public."Users" UU on T.receiver = UU.id WHERE (T.sender = :userId OR T.receiver = :userId) AND T.id = :transferId`, {
            replacements: {userId: userId, transferId: transferId}, type: this.db.Sequelize.QueryTypes.SELECT
        });
    }

    getAllTransfers() {
        return this.db['Transfer'].findAll();
    }

    getTransfer(transferId) {
        return this.db['Transfer'].findAll({
            where: {
                id: transferId
            }
        });
    }

    newTransfer(sender, receiver, amount, title) {
        /* correct, sensible solution
        return this.db['Transfer'].create({
            sender: sender,
            receiver: receiver,
            amount: amount,
            title: title,
            datetime: new Date()
        });
         */

        // INCORRECT, WRONG SOLUTION - ONLY FOR TESTING SQL INJECTION PURPOSES
        const id = uuidv4();
        return {
            query: this.db.sequelize.query(`INSERT INTO public."Transfers" (id, sender, receiver, amount, title, datetime, "createdAt", "updatedAt") VALUES ('${id}', '${sender}', '${receiver}', ${amount}, '${title}', :dateTime, :dateTime, :dateTime)`, {
                replacements: {dateTime: new Date()}, type: this.db.Sequelize.QueryTypes.INSERT
            }), id: id
        };
    }
}

module.exports = DatabaseFacade;