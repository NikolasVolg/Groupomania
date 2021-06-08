const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../middleware/schema/userSchema');
const passwordSchema = require('../middleware/schema/passwordSchema')
const db = require('../models');
const dbUser = db.user;
//const fs = require('fs');

require('dotenv').config();

exports.signup = async(req, res) => {

    try {

        const validPassword = await passwordSchema.validate(req.body.password);
        const valid = await userSchema.validateAsync(req.body);

        if (valid && validPassword) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    };
                    dbUser.create(user)
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ message: error.message }));
        } else {
            throw error('input invalid');
        };

    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.login = async(req, res) => {

    try {
        const valid = await userSchema.validateAsync(req.body);
        if (valid) {
            dbUser.findOne({
                    where: {
                        email: req.body.email,
                    }
                })
                .then(user => {
                    if (!user) {
                        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                    }
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'Mot de passe ou email incorrect !' });
                            }
                            const tokenUser = jwt.sign({
                                    userId: user.idUsers,
                                    isAdmin: user.isAdmin
                                },
                                process.env.SECRET_KEY, { expiresIn: '24h' });

                            res.status(200).json({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                userId: user.idUsers,
                                email: req.body.email,
                                token: tokenUser
                            });
                        })
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));

        } else {
            throw error('input invalid');
        }

    } catch (error) {
        res.status(400).json({ error });
    }
};


exports.tokenUser = (req, res) => {

    const tokenUserId = req.decodedToken.userId;

    if (tokenUserId) {
        dbUser.findOne({
                where: {
                    idUsers: tokenUserId,
                }
            })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                } else {
                    res.status(200).json({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userId: user.idUsers,
                        email: user.email,
                        token: req.token,
                        isAdmin: user.isAdmin
                    })
                };
            })
            .catch(error => res.status(500).json({ message: error.message }));
    } else {
        res.status(400).json({ error });
    };
};

exports.deleteUser = (req, res) => {

    const tokenUserId = req.decodedToken.userId;

    dbUser.findOne({ where: { idUsers: tokenUserId } })

    .then(() => {
            dbUser.destroy({
                    where: { idUsers: tokenUserId },
                })
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(501).json({ message: error.message }));
};


// exports.modifyUser = async(req, res) => {

//     try {

//         const findUser = await dbUser.findOne({ where: { idUsers: req.params.id } });

//         if (findUser) {

//             const isValid = await userSchema.validateAsync(req.body);

//             if (isValid) {

//                 const userObject = req.file ? {
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     email: req.body.email,
//                     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//                 } : {
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     email: req.body.email,
//                 };

//                 findUser.update({...userObject })
//                     .then(() => res.status(200).json({ message: 'User modifié !' }))
//                     .catch(error => res.status(500).json({ message: error.message }));


//             } else {
//                 throw error('input invalid');
//             };

//         } else {
//             res.status(404).json({ message: 'Utilisateur non trouvé' });
//         };


//     } catch (error) {

//         res.status(500).json({ message: error.message });

//     };

// };