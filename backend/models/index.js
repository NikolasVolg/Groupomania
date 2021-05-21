"use strict";

const dbConfig = require("../config/db-config.js");
const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.publication = require("./publi.js")(sequelize, Sequelize);
//db.comment = require("./comment.js")(sequelize, Sequelize);

//Jointure User <--> Publication

db.user.hasMany(db.publication, {
    foreignKey: "Users_idUsers",
    as: "publication"
});

db.publication.belongsTo(db.user, {
    foreignKey: "Users_idUsers",
    as: "users",
});

module.exports = db;