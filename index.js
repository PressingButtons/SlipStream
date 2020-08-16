'use strict';
const express = require('express');
const app = express();
const body_parser = require('body-parser');
const path = require('path');

//middlewares
app.use('/client', express.static(path.join(__dirname, 'client')));

const server = require(path.join(__dirname, 'scripts/server.js'))(path, app);
server.init(3000);
