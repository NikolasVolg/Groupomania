const express = require('express');
const path = require('path');
const helmet = require("helmet");
const db = require("./models");
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const userRoutes = require('./routes/users');

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
// app.use('/api/publi', publiRoutes);

app.use('/', (req, res) => {

    res.cookie('cookieSession', 'Bearer', token, {

        domain: 'http://localhost:8080',
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 3600000)

    });

});


module.exports = app;