import Knex from "../models/knex"

export async function createChatroom(chatroomName: string) {
    const newChatroom = await Knex("chatrooms")
        .insert({ chatroom_name: chatroomName, created_at: new Date() })
        .returning("*")
        .then((rows) => rows[0])

    return newChatroom
}
