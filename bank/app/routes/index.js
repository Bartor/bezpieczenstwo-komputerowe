module.exports = (router, data) => {
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Homepage - Banco Epico',
            navLinks: data.config.navLinks(req.authentication.passed)
        });
    });

    return router;
};