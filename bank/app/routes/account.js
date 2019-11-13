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

    return router;
};