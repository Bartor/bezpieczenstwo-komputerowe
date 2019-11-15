module.exports = (router, refs) => {
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
            navLinks: refs.config.navLinks(req.authentication.passed)
        });
    });

    router.post('/', (req, res) => {
        const [
            email,
            password,
        ] = [
            req.body.email ? req.body.email.toLocaleLowerCase() : '',
            req.body.password || '',
        ];

        if (!email || !password) {
            res.status(400).json({error: 'All Fields are required'});
        }

        refs.db.verifyUser(email, password).then(id => {
            if (id) {
                const token = refs.auth.authenticate(id, refs.config.tokenTimeout);
                res.cookie('token', token);
                res.json({token: token});
            } else {
                res.status(401).json({error: 'Wrong credentials'});
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});
        });
    });

    router.get('/register', (req, res) => {
        res.render('register', {
            title: 'Register - Banco Epico',
            navLinks: refs.config.navLinks(req.authentication.passed)
        });
    });

    router.post('/register', (req, res) => {
        const emailRegex = /^[.a-z0-9]+@[a-z][a-z0-9]*\.[a-z]{2,3}$/;
        const nameRegex = /^[A-Z][a-z]*$/;

        const cap = (s) => s ? s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase() : '';

        const message = {
            errors: []
        };

        const [
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        ] = [
            cap(req.body.firstName),
            cap(req.body.lastName),
            req.body.email ? req.body.email.toLocaleLowerCase() : '',
            req.body.password || '',
            req.body.repeatPassword || ''
        ];

        if (
            !firstName || !lastName ||
            !email || !password || !repeatPassword
        ) {
            res.status(400);
            message.errors.push('All fields are required');
        }

        if (!emailRegex.test(email)) {
            res.status(400);
            message.errors.push('Incorrect email');
        }

        if (!nameRegex.test(firstName)) {
            res.status(400);
            message.errors.push('Incorrect first name');
        }

        if (!nameRegex.test(lastName)) {
            res.status(400);
            message.errors.push('Incorrect second name');
        }

        if (repeatPassword !== password) {
            res.status(400);
            message.errors.push('Password don\'t match');
        }

        if (message.errors.length === 0) {
            refs.db.newUser(firstName, lastName, email, password)
                .then(user => {
                    res.json(message);
                }).catch(error => {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    res.status(400);
                    message.errors.push('This email address is already taken');
                } else {
                    res.status(500);
                }
                console.error(error);
                res.json(message);
            });
        } else {
            res.json(message);
        }
    });

    return router;
};