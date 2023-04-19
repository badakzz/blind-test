import Knex from "../models/knex"
import { generateUniqueId } from "../utils/helpers"
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

    const chatMessageId = generateUniqueId()
    const newMessage = await Knex("chat_messages")
        .insert({ ...message, chat_message_id: chatMessageId })
        .returning("*")
        .then((rows) => rows[0])
}

export async function flagMessage(messageId, reason, reporterId) {
    const flaggedMessage = await Knex("chat_messages")
        .where({ id: messageId })
        .update({ flagged: true, flagReason: reason, reporterId })
        .returning("*")
        .then((rows) => rows[0])

    return flaggedMessage
}
