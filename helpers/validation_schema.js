const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    username: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email()
        .lowercase(),
    password: Joi.string()
        .min(6)
        .required()
})
const loginValidation = Joi.object({
    email: Joi.string()
        .required()
        .email()
        .lowercase(),
    password: Joi.string()
        .required()
})
const textSchema = Joi.object({
    text: Joi.string()
        .min(6)
        .required(),
    score: Joi.string()
        .required(),
    magnitude: Joi.string()
        .required(),
    userID: Joi.string()
    .required(),
})
module.exports = {
    registerSchema,
    loginValidation,
    textSchema
}