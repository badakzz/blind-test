import Joi from "joi"

export const chatMessageSchema = Joi.object({
    content: Joi.string().min(1).max(1000).required(),
    sender_id: Joi.string().required(),
    created_at: Joi.date().required(),
    chatroom_id: Joi.string().required(),
    is_flagged: Joi.boolean().optional(),
    reporter_id: Joi.string().optional(),
})
