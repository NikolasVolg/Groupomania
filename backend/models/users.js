"use strict";

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "users", {
            idUsers: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: "email_UNIQUE"
            },
            lastName: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            bio: {
                type: Sequelize.STRING(250),
                allowNull: true
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                default: false
            },
        }, {
            sequelize,
            tableName: "users",
            timestamps: false,
            indexes: [{
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{
                        name: "idUsers"
                    }],

                },
                {
                    name: "email_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [{
                        name: "email"
                    }],

                }
            ]
        });
    return User;
};