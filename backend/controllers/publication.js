const db = require('../models');
const publiSchema = require('../middleware/schema/publiSchema');
const dbPubli = db.publi;
const dbUser = db.user;

exports.publiAll = async(req, res, next) => {
    try {
        //const valid schema Joi pour publi

        if (valid) {
            dbPubli.findAll({
                    where: {
                        publi: req.body.publi
                    }
                })
                .then(publi => {
                    res.status(200).json({
                        publi: publi
                    })
                })
                .catch(error => res.status(500).json({ message: error.message }));

        } else {
            throw error('input invalid');
        };

    } catch (error) {

        res.status(400).json({ message: error.message })

    };
};

exports.publiCreate = async(req, res) => {
    try {

        const tokenUserId = await req.decodedToken.userId;
        const valid = await publiSchema.validateAsync(req.body);

        if (valid && tokenUserId) {

            const publi = {
                content: req.body.content
            };

            dbPubli.create(publi) //"message": "Cannot read property 'create' of undefined"
                .then(() => res.status(201).json({ message: 'Publication créé !' }))
                .catch(error => res.status(400).json({ error }));

        } else {
            throw error('input invalid');
        };

    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};