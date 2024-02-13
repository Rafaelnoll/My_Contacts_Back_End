/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const handleErrors = require('./app/middlewares/handleErrors');
const cors = require('./app/middlewares/cors');

const server = express();

server.use(cors);
server.use(express.json());
server.use(routes);
server.use(handleErrors);

module.exports = server;
