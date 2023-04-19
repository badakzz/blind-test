import Knex from "../models/knex"

export const createChatroom = async (chatroom_id) => {
    const newChatroom = await Knex("chatrooms")
        .insert({ chatroom_id })
        .returning("*")
        .then((rows) => rows[0])

    console.log("New chatroom created:", newChatroom)
    return newChatroom
}
