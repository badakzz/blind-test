const Joi = require("joi")

export const userSignupSchema = Joi.object({
    user_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    permissions: Joi.number().optional(),
    is_active: Joi.boolean().optional(),
})

export const userLoginSchema = Joi.object({
    identifier: Joi.string().required(),
    password: Joi.string().required(),
})
