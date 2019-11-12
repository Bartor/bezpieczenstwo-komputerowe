module.exports = (router, config) => {
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Homepage - Banco Epico',
            navLinks: config.navLinks(req.authentication.passed)
        });
    });

    return router;
};