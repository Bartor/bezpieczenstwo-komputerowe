module.exports = (router, data) => {
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Hello!',
            navLinks: data.config.navLinks(req.authentication.passed)
        });
    });

    router.get('/transfers', (req, res) => {
        res.render('index', {
            title: 'Hello!',
            navLinks: data.config.navLinks(req.authentication.passed)
        });
    });

    router.get('/logout', (req, res) => {
        data.auth.deauthenticate(req.authentication.user);
        res.cookie('user', '');
        res.cookie('token', '');
        res.redirect('/');
    });

    return router;
};