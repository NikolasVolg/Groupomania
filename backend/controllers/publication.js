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
                Users_idUsers: tokenUserId,
                image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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

    let idMessage = req.params.id;

    dbPubli.findOne({
            where: { Users_idUsers: dbPubli }
        })
        .then((userPost) => {
            return userPost;
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });

    console.log("ConsoleLog findPubli: " + userPost);

    console.log("ConsoleLog : " + idMessage);

    if (idMessage <= 0) {
        return res.status(404).json({ error: 'Publication non trouvé' });
    } else if (tokenUserId === userPost) {

        dbPubli.destroy({
                where: {
                    idPublication: idMessage,
                    Users_idUsers: tokenUserId
                }
            })
            .then(() => {
                res.status(200).send({ message: "Publication supprimée !" });
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });

    } else {
        return res.status(401).json({ error: 'No Match Id' });
    }

};

// dbUser.findOne({
//     where: { idUsers: tokenUserId }
// })
// .then(user => {

//     console.log("plouf" + user);

//     if (!user) {
//         return res.status(401).json({ error: 'Utilisateur non trouvé' });
//     }
//     return dbPubli.findOne({
//         where: { idPublication: publication },
//     });
// })
// .then((post) => {

//     if (post.Users_idUsers === tokenUserId || user.isAdmin == 1) {

//         return post.destroy({ where: { idPublication: findPost } });
//     } else {
//         throw res.status(400).send({ error });
//     }
// })
// .then(() => {
//     res.status(200).send({ message: "Publication supprimée !" });
// })

// .catch((err) => {
// res.status(500).send({
//     message: err.message
// });
// });