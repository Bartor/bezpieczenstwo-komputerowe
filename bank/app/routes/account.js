module.exports = (router, refs) => {
    router.get('/', (req, res) => {
        refs.db.getUserTransfers(req.authentication.user).then(transfers => {
            res.render('account', {
                title: 'Account - Banco Epico',
                navLinks: refs.config.navLinks(req.authentication.passed),
                transfers: transfers,
                balance: transfers.reduce((acc, transfer) => {
                    if (transfer.status === 'accepted') {
                        if (transfer.sender === req.authentication.user) {
                            return acc - transfer.amount;
                        } else {
                            return acc + Number(transfer.amount);
                        }
                    } else {
                        return acc;
                    }
                }, 0)
            });
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'There was an error when trying to get list of your transfers'});
        });
    });

    router.get('/transfer', (req, res) => {
        res.render('transfer', {
            title: 'Transfer - Banco Epico',
            navLinks: refs.config.navLinks(req.authentication.passed)
        });
    });

    router.post('/transfer', (req, res) => {
        const emailRegex = /^[.a-z0-9]+@[a-z][a-z0-9]*\.[a-z]{2,3}$/;

        const message = {
            errors: []
        };

        if (!req.body.email || !req.body.amount) {
            message.errors.push('All fields are required');
        }

        if (!emailRegex.test(req.body.email)) {
            message.errors.push('Incorrect email');
        }

        if (req.body.amount < 0 || (req.body.amount || 0).toString().split('').reverse().indexOf('.') > 2) {
            message.errors.push('Incorrect amount');
        }

        if (message.errors.length > 0) {
            res.status(400).json(message);
            return;
        }

        refs.db.findUserByEmail(req.body.email).then(users => {
            if (users.length === 1) {
                const receiver = users[0].id;

                if (receiver === req.authentication.user) {
                    res.status(400).json({errors: ['Can\'t send money to yourself']});
                    return;
                }

                refs.db.newTransfer(req.authentication.user, receiver, req.body.amount).then(transfer => {
                    res.json({transferId: transfer.id});
                }).catch(err => {
                    console.error(err);
                    res.status(500).json({errors: ['There was an error when processing your request']});
                });
            } else {
                if (users.length) {
                    console.error('MULTIPLE RESULTS ON UNIQUE CONSTRAINTS WHAT');
                    res.status(500).json({errors: ['There was an error when processing your request']});
                } else {
                    res.status(400).json({errors: ['There is no such user']});
                }
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({errors: ['There was an error when processing your request']});
        })
    });

    router.get('/transfer/:id', (req, res) => {
        refs.db.getUserTransfer(req.authentication.user, req.params.id).then(transfers => {
            if (transfers.length === 1) {
                res.render('transferDetails', {
                    title: 'Transfer details - Banco Epico',
                    navLinks: refs.config.navLinks(req.authentication.passed),
                    transfer: transfers[0],
                    canAccept: transfers[0].sender === req.authentication.user && transfers[0].status === 'pending'
                });
            } else {
                if (transfers.length) {
                    res.status(400).json({error: 'Ambiguous transfer'});
                    console.error('Multiple matched transfers');
                } else {
                    res.status(404).json({error: 'No such transfer'});
                }
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'There was an error when processing your request'});
        });
    });

    router.get('/transfer/:id/cancel', (req, res) => {
        refs.db.cancelTransfer(req.authentication.user, req.params.id).then(data => {
            if (data.length) {
                res.json({});
            } else {
                res.status(400).json({errors: ['There is no such transfer']});
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({errors: ['There was an error when processing your request']});
        });
    });

    router.get('/transfer/:id/accept', (req, res) => {
        refs.db.acceptTransfer(req.authentication.user, req.params.id).then(data => {
            console.log(data);
            res.json({});
        }).catch(err => {
            console.error(err);
            res.status(500).json({errors: ['There was an error when processing your request']});
        });
    });

    router.get('/logout', (req, res) => {
        refs.auth.deauthenticate(req.authentication.user);
        res.cookie('token', '');
        res.redirect('/');
    });

    return router;
};