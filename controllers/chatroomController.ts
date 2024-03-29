import Knex from "../models/knex"
import { TABLE } from "../utils/constants"
import { chatroomSchema } from "./validation/chatroomSchema"

export const createChatroom = async (chatroom_id) => {
    const timestamp = new Date()
    const chatroom = {
        chatroom_id,
        created_at: timestamp,
        updated_at: timestamp,
    }

    const { error } = chatroomSchema.validate(chatroom, {
        abortEarly: false,
    })

    if (error) {
        throw new Error(
            "Validation failed: " +
                error.details.map((detail) => detail.message)
        )
    }

    try {
        const newChatroom = await Knex(TABLE.CHATROOMS)
            .insert(chatroom)
            .returning("*")
            .then((rows) => rows[0])
        console.log("New chatroom created:", newChatroom)
    } catch (err) {
        console.error("Failed to create the chatroom:", err)
    }
}
