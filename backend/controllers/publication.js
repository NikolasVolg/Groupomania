const db = require('../models');
const publiSchema = require('../middleware/schema/publiSchema');
const dbPubli = db.publication;
const dbUser = db.user;

exports.publiAll = (req, res) => {

    dbPubli.findAll({
            where: {
                publication: req.body.publication
            }
        })
        .then(publi => {
            res.status(200).json({
                publi: publi
            })
        })
        .catch(error => res.status(500).json({ message: error.message }));

};

exports.publiCreate = async(req, res) => {
    try {

        const tokenUserId = await req.decodedToken.userId;
        const valid = await publiSchema.validateAsync(req.body);

        if (valid && tokenUserId) {

            const publication = {
                content: req.body.content,
                Users_idUsers: tokenUserId
            };

            console.log(publication);

            dbPubli.create(publication) //"message": "Cannot read property 'create' of undefined"
                .then(() => res.status(201).json({ message: 'Publication créé !' }))
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