const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../middleware/schema/userSchema');
const db = require('../models');

exports.signup = async(req, res, next) => {
    try {
        const valid = await userSchema.validateAsync(req.body);
        if (valid) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    }
                    db.user.create(user)
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
            db.user.findOne({

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
                            res.status(200).json({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                userId: user.idUsers,
                                email: req.body.email,
                                token: jwt.sign({ userId: user.idUsers },
                                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                                )
                            });
                        })
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            throw error('input invalid');
        }
    } catch {
        res.status(400).json({ error });
    }
};

// exports.modify = async(req, res, next) => {

//     try {
//         const userObject = req.file ? {
//             ...JSON.parse(req.body.user),
//             imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//         } : {...req.body };

//         // const isValid = await userSchemaControllers.validateAsync(userObject);

//         if (isValid) {
//             db.ser.save({ _id: req.params.id }, {...userObject, _id: req.params.id })
//                 .then(() => res.status(200).json({ message: 'User modifié !' }))
//                 .catch(error => res.status(400).json({ error }));

//         } else {
//             throw error('input invalid');
//         }

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// };



// exports.delete = (req, res, next) => {

// };