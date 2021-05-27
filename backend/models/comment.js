"use strict";

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
        "comment", {
            idComments: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            Users_idUsers: {
                type: Sequelize.INTEGER,
                allowNull: false, //est-ce que je veux que ce soit vide ?
                references: {
                    model: "users",
                    key: "idUsers",
                },
            },
            Publication_idPublication: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "publication",
                    key: "idPublication",
                },
            },
        }, {
            sequelize,
            tableName: "comment",
            timestamps: false,
            // indexes: [{
            //         name: "PRIMARY",
            //         unique: true,
            //         using: "BTREE",
            //         fields: [{
            //             name: "idComments"
            //         }],
            //     },
            //     {
            //         name: "FK_Publication_idPublication",
            //         using: "BTREE",
            //         fields: [{
            //             name: "Publication_idPublication"
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
    return Comment;
};