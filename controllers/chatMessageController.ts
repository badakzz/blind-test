import Knex from "../models/knex"
import { chatMessageSchema } from "./validation/chatMessageSchema"

export const saveChatMessage = async (message) => {
    const { error, value } = chatMessageSchema.validate(message, {
        abortEarly: false,
    })

    if (error) {
        throw new Error(
            "Validation failed: " +
                error.details.map((detail) => detail.message)
        )
    }

    const savedMessage = await Knex("chat_messages")
        .insert(value)
        .returning("*")
        .then((rows) => rows[0])

    console.log("savedMessage", savedMessage)
    return savedMessage
}

export async function flagMessage(messageId, reason, reporterId) {
    const flaggedMessage = await Knex("chat_messages")
        .where({ id: messageId })
        .update({ flagged: true, flagReason: reason, reporterId })
        .returning("*")
        .then((rows) => rows[0])

    return flaggedMessage
}
