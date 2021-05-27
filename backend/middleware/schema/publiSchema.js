const Joi = require('joi');

const joiSchema = Joi.object({

    content: Joi.string()
        .pattern(new RegExp("[-',!?()\".a-zA-ZÀ-ÿ ]+$"))
});

module.exports = joiSchema;