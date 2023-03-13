const Joi = require("joi")

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    status: Joi.string().valid("active", "inactive").required(),
})

export default userSchema
