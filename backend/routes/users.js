const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const rateLimit = require("express-rate-limit");

const auth = require('../middleware/auth');

const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // fenêtre d'une heure
    max: 5, // 5 requêtes max par fenêtre
    message: "Trop de comptes créés à partir de cette IP, merci de réessayer dans une heure"
});

const loginAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // fenêtre d'une heure
    max: 5, // 5 requêtes max par fenêtre
    message: "Trop de connexions créés à partir de cette IP, merci de réessayer dans une heure"
});

router.get('/users/token', auth, userCtrl.tokenUser);
router.post('/signup', createAccountLimiter, userCtrl.signup);
router.post('/login', loginAccountLimiter, userCtrl.login);
router.put('/users/:id', auth, userCtrl.modifyUser);
router.delete('/users/deleteUser', auth, userCtrl.deleteUser);

module.exports = router;