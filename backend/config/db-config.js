"use strict";

module.exports = {
    HOST: process.env.GMHOST,
    USER: process.env.GMUSER,
    PASSWORD: process.env.GMPASSWORD,
    DB: process.env.GMDB,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};