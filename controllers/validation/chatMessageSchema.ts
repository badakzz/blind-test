import Joi from "joi"

export const chatMessageSchema = Joi.object({
    content: Joi.string().min(1).max(1000).required(),
    sender: Joi.string().required(),
    timestamp: Joi.date().required(),
    chatroomId: Joi.string().required(),
    flagged: Joi.boolean().optional(),
    flagReason: Joi.string().optional(),
    reporterId: Joi.string().optional(),
})
