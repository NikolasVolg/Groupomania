const Joi = require('joi');

const joiSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(24)
        .pattern(new RegExp('[a-zA-Z\- ]+$')),

    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(24)
        .pattern(new RegExp('[a-zA-Z\- ]+$')),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),

    password: Joi.string()
});

module.exports = joiSchema;