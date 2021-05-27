const db = require('../models');
const publiSchema = require('../middleware/schema/publiSchema');
const dbPubli = db.publication;
const dbUser = db.user;

exports.publiAll = (req, res) => {

    //const $idPublication = req.query.idPublication;

    dbPubli.findAll({

            order: [
                ["idPublication", "DESC"]
            ],

            include: {
                model: dbUser,
                as: "users",
                attributes: ["firstName", "lastName"]
            },

        })
        .then((message) => {
            if (message) {
                res.status(200).json(message)

                console.log(message);

            } else {
                res.status(404).json({ message: "publications non trouvées" })
            };
        })
        .catch((error) => res.status(500).json({ message: "Dommage : " + error.message }));
};

exports.publiCreate = async(req, res) => {

    try {

        const tokenUserId = req.decodedToken.userId;
        const valid = await publiSchema.validateAsync(req.body);

        if (valid && tokenUserId) {

            const publication = {
                content: req.body.content,
                Users_idUsers: tokenUserId
            };

            dbPubli.create(publication)
                .then((createPost) => {

                    dbUser.findOne({
                            where: { idUsers: tokenUserId },
                            attributes: ["firstName", "lastName"]
                        })
                        .then((user) => {

                            const post = {
                                idPublication: createPost.idPublication,
                                Users_idUsers: createPost.Users_idUsers,
                                content: createPost.content,
                                image: createPost.image,
                                users: {
                                    firstName: user.firstName,
                                    lastName: user.lastName
                                }
                            };

                            return res.status(201).json(post)
                        })
                        .catch(error => res.status(404).json({ error }));

                })
                .catch(error => res.status(400).json({ error }));

        } else {
            throw error('input invalid');
        };

    } catch (error) {
        res.status(500).json({ message: error.message })
    };
};

exports.publiDelete = (req, res) => {

    const tokenUserId = req.decodedToken.userId;
    const findPubli = req.idMessages;

    dbUser.findOne({
            where: { idUsers: tokenUserId }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            } else {
                dbPubli.destroy({
                    where: { idMessages: findPubli }
                })
            }
        })
};