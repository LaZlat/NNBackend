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
const insertRoutes = require('./routes/insert')
const resetRoutes = require('./routes/reset')

app.use('/NN', NNRoutes)
app.use('/', mainRoutes)
app.use('/insert', insertRoutes)
app.use('/reset', resetRoutes)

module.exports = app