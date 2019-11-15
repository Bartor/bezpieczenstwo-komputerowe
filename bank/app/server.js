const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto');
const http = require('http');

const Authenticator = require('./scripts/Authenticator');
const DatabaseFacade = require('./scripts/DatabaseFacade');

const config = require('./config/appConfig');
const db = new DatabaseFacade(require('./models/index'), crypto);
const auth = new Authenticator(crypto);

const refs = {
    config: config,
    db: db,
    auth: auth
};

const indexRouter = require('./routes/index')(express.Router(), refs);
const accountRouter = require('./routes/account')(express.Router(), refs);
const loginRouter = require('./routes/login')(express.Router(), refs);

const app = express();

// pug render engine
app.set('view engine', 'pug');
app.set('views', 'views');

// static files
app.use('/static', express.static('static'));

// request parser
app.use(bodyParser.json());
app.use(cookieParser());

// routers
app.use((req, res, next) => { // authentication
    if (req.cookies.token) {
        req.authentication = auth.authorize(req.cookies.token);
    } else {
        req.authentication = {
            passed: false
        };
    }
    next();
});
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use((req, res, next) => {
    if (req.authentication.passed) {
        next();
    } else {
        res.redirect('/login');
    }
});
app.use('/account', accountRouter);

const httpServer = http.createServer(app);

refs.db.sequelize.authenticate()
    .then(() => {
        db.sequelize.sync();
        console.log('Connected to database');
        httpServer.listen(80, () => {
            console.log('HTTP server started on 80');
        })
    }).catch(error => {
    console.log('Error when connecting to database:', error);
});
