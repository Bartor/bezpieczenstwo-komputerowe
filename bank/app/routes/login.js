module.exports = (router, config) => {
    router.use((req, res, next) => {
       if (req.authentication.passed) {
           res.redirect('/account');
       } else {
           next();
       }
    });

    router.get('/', (req, res) => {
        res.render('login', {
            title: 'Login - Banco Epico',
            navLinks: config.navLinks(req.authentication.passed)
        });
    });

    router.get('/register', (req, res) => {
        res.render('register', {
            title: 'Register - Banco Epico',
            navLinks: config.navLinks(req.authentication.passed)
        });
    });

    router.post('/register', (req, res) => {

    });

    return router;
};