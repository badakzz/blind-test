import Knex from "../../models/knex"
import { TABLE } from "../utils/constants"
import { Message } from "../utils/types"

export async function insertChatMessageInDB(
    chatMessageId,
    message
): Promise<Message> {
    return Knex(TABLE.CHAT_MESSAGES)
        .insert({ ...message, chat_message_id: chatMessageId })
        .returning("*")
        .then((rows) => rows[0])
}
