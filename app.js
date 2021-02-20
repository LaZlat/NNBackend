const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const db = require('./db');
const util = require('util');

const app = express();

app.use(cors())
app.use(bodyParser.json());

const query = util.promisify(db.query).bind(db);

global.db = db;
global.query = query;

const NNRoutes = require('./routes/NN')
const mainRoutes = require('./routes/main')


app.use('/NN', NNRoutes)
app.use('/', mainRoutes)

module.exports = app