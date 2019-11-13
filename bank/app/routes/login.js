module.exports = (router, data) => {
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
            navLinks: data.config.navLinks(req.authentication.passed)
        });
    });

    router.get('/register', (req, res) => {
        res.render('register', {
            title: 'Register - Banco Epico',
            navLinks: data.config.navLinks(req.authentication.passed)
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

        console.log(message);

        if (message.errors.length === 0) {
            data.db.newUser(firstName, lastName, email, password)
                .then(user => {
                    console.log(user);
                    res.json(message);
                }).catch(error => {
                console.log(error);
                res.status(500);
                res.json(message);
            });
        } else {
            res.json(message);
        }
    });

    return router;
};