"use strict";

module.exports = (sequelize, Sequelize) => {
    const Publi = sequelize.define(
        "publi", {
            idMessages: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            Users_idUsers: {
                type: Sequelize.INTEGER,
                allowNull: false, //est-ce que je veux que ce soit vide ?
                unique: "Users_idUsers_UNIQUE"
            },
            content: {
                type: Sequelize.STRING(1000),
                allowNull: false
            },
            image: {
                type: Sequelize.STRING(45),
                allowNull: true
            },
        }, {
            sequelize,
            tableName: "publication",
            timestamps: false,
            indexes: [{
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{
                        name: "idMessages"
                    }],

                },
                {
                    name: "Users_idUsers_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [{
                        name: "Users_idUsers"
                    }],

                }
            ]
        }
    );
    return Publi;
};