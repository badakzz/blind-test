const Joi = require("joi")

const userSchema = Joi.object({
    user_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    permissions: Joi.number().min(1).max(1).optional(),
    is_active: Joi.boolean().optional(),
})

export default userSchema
