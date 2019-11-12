module.exports = (router, config) => {
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Hello!',
            navLinks: config.navLinks(req.authentication.passed)
        });
    });

    router.get('/transfers', (req, res) => {
        res.render('index', {
            title: 'Hello!',
            navLinks: config.navLinks(req.authentication.passed)
        });
    });

    return router;
};