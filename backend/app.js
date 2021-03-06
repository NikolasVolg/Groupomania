const express = require('express');
const path = require('path');
const helmet = require("helmet");
require('dotenv').config();
const db = require("./models");

const app = express();
const userRoutes = require('./routes/users');
const publiRoutes = require('./routes/publication');

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://' + process.env.ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
db.sequelize.sync();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/publi', publiRoutes);

module.exports = app;