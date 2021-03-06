const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;

        if (isAdmin === 0) {
            if (req.body.userId && req.body.userId !== userId) {
                throw 'Invalid user ID';
            } else {
                req.decodedToken = decodedToken;
                req.token = token;
                next();
            }
        } else {
            req.decodedToken = decodedToken;
            req.token = token;
            next();
        }

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};