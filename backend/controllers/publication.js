const db = require('../models');
const dbPubli = db.publi;

exports.publiWall = async(req, res, next) => {
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