module.exports = (router, refs) => {
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Homepage - Banco Epico',
            navLinks: refs.config.navLinks(req.authentication.passed)
        });
    });

    return router;
};