const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)
    .is().max(36)
    .has().uppercase(1)
    .has().digits(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123', 'motdepasse', 'Motdepasse', 'MotDePasse']);

module.exports = passwordSchema;