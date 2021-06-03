"use strict";

module.exports = (sequelize, Sequelize) => {
    const Publi = sequelize.define(
        "publication", {
            idPublication: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            Users_idUsers: {
                type: Sequelize.INTEGER,
                allowNull: false, //est-ce que je veux que ce soit vide ?
                references: {
                    model: "users",
                    key: "idUsers",
                },
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            image: {
                type: Sequelize.STRING(64),
                allowNull: true
            },
        }, {
            sequelize,
            tableName: "publication",
            timestamps: false,
            // indexes: [{
            //         name: "PRIMARY",
            //         unique: true,
            //         using: "BTREE",
            //         fields: [{
            //             name: "idPublication"
            //         }],

            //     },
            //     {
            //         name: "FK_Users_idUsers",
            //         using: "BTREE",
            //         fields: [{
            //             name: "Users_idUsers"
            //         }],

            //     }
            // ]
        }
    );
    return Publi;
};