const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../middleware/schema/userSchema');
const passwordSchema = require('../middleware/schema/passwordSchema')
const db = require('../models');
const User = db.user;
//const fs = require('fs');

require('dotenv').config();

exports.signup = async(req, res, next) => {
    try {
        const validPassword = passwordSchema.validate(req.body.password);
        const valid = await userSchema.validateAsync(req.body);

        if (valid && validPassword) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    }
                    User.create(user)
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ message: error.message }));
        } else {
            throw error('input invalid');
        };
    } catch (error) {
        res.status(400).json({ error });
    };
};

exports.login = async(req, res, next) => {
    try {

        const valid = await userSchema.validateAsync(req.body);

        if (valid) {
            User.findOne({

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
                            const tokenUser = jwt.sign({ userId: user.idUsers },
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

exports.tokenUser = (req, res, next) => {

    const tokenUserId = req.decodedToken.userId; //renvoie uniquement userId

    //aller chercher les info dans la BDD
    db.user.findOne({

            where: {
                idUsers: tokenUserId,
            }

        })
        .then(user => {
            //si pas d'user, c'est moche
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });

            } else { //si user renvoie des infos route login

                res.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userId: user.idUsers,
                    email: user.email,
                    token: decodedToken,
                })
            };
        })
        .catch(error => res.status(500).json({ message: error.message }));

};

//si du temps séparer modif user et modif password !!!!

exports.modifyUser = async(req, res, next) => {

    try {

        const findUser = await User.findOne({ where: { idUsers: req.params.id } });

        if (findUser) {

            const isValid = await userSchema.validateAsync(req.body);

            if (isValid) {


                const userObject = req.file ? {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                };

                findUser.update({...userObject })
                    .then(() => res.status(200).json({ message: 'User modifié !' }))
                    .catch(error => res.status(500).json({ message: error.message }));


            } else {
                throw error('input invalid');
            };

        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        };


    } catch (error) {

        res.status(500).json({ message: error.message });

    };

};



// exports.deleteUser = async(req, res, next) => {

//     try {
//         User.findOne({ where: { idUsers: req.params.id } })

//         .then(user => {
//                 const filename = user.imageUrl.split('/images/')[1];
//                 fs.unlink(`images/${filename}`, () => {
//                     User.deleteOne({ idUsers: req.params.id })
//                         .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
//                         .catch(error => res.status(400).json({ message: error.message }));
//                 });
//             })
//             .catch(error => res.status(501).json({ message: error.message }));


//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }


// };