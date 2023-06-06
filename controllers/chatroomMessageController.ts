import Knex from "../models/knex"
import { TABLE } from "../utils/constants"
import { generateUniqueId } from "../utils/helpers"
import { chatMessageSchema } from "./validation/chatMessageSchema"

export const saveChatMessage = async (message) => {
    const { error } = chatMessageSchema.validate(message, {
        abortEarly: false,
    })

    if (error) {
        throw new Error(
            "Validation failed: " +
                error.details.map((detail) => detail.message)
        )
    }

    const chatMessageId = generateUniqueId()
    const newMessage = await Knex(TABLE.CHAT_MESSAGES)
        .insert({ ...message, chat_message_id: chatMessageId })
        .returning("*")
        .then((rows) => rows[0])
}

const flagMessage = async (messageId, reason, reporterId) => {
    const flaggedMessage = await Knex(TABLE.CHAT_MESSAGES)
        .update({ flagged: true, flagReason: reason, reporterId })
        .returning("*")
        .then((rows) => rows[0])

    return flaggedMessage
}
