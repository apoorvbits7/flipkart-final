const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;