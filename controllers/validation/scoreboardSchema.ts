const Joi = require("joi")

export const scoreboardSchema = Joi.object({
    user_id: Joi.number().required(),
    chatroom_id: Joi.string().required(),
    score: Joi.number().required(),
})
