import { chatMessageSchema } from "../validation/chatMessageSchema"
import * as ChatMessageDAO from "../dao/ChatMessageDAO"
import { generateUniqueId } from "../utils/helpers"
import { Message } from "../utils/types"

export const saveChatMessage = async (message): Promise<Message> => {
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
    const newMessage = await ChatMessageDAO.insertChatMessageInDB(
        chatMessageId,
        message
    )

    return newMessage
}
