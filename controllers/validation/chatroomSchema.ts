const Joi = require("joi")

export const chatroomSchema = Joi.object({
    chatroom_id: Joi.string().required(),
    created_at: Joi.date().required(),
    updated_at: Joi.date().required(),
})
