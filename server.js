const express = require('express');
const cors = require('cors');
const server = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./routes');

// Middleware
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// ici on appelle les routes du dossier routes
server.use(morgan('dev'));
server.use(router);

module.exports = server;
