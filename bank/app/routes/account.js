module.exports = (router, refs) => {
    router.get('/', (req, res) => {
        refs.db.getUserTransfers(req.authentication.user).then(transfers => {
            res.render('account', {
                title: 'Account - Banco Epico',
                navLinks: refs.config.navLinks(req.authentication.passed),
                transfers: transfers
            });
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'There was an error when trying to get list of your transfers'});
        });
    });

    router.get('/transfers', (req, res) => {
        res.render('index', {
            title: 'Hello!',
            navLinks: refs.config.navLinks(req.authentication.passed)
        });
    });

    router.get('/logout', (req, res) => {
        refs.auth.deauthenticate(req.authentication.user);
        res.cookie('token', '');
        res.redirect('/');
    });

    return router;
};