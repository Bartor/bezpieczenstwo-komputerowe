module.exports = (router, config) => {
    router.use((req, res, next) => {
       if (req.authentication.passed) {
           res.redirect('/account');
       } else {
           next();
       }
    });

    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Hello!',
            navLinks: config.navLinks(req.authentication.passed)
        });
    });

    router.get('/register', (req, res) => {
        res.render('index', {
            title: 'Hello!',
            navLinks: config.navLinks(req.authentication.passed)
        });
    });

    return router;
};