import Knex from "../models/knex"

export const updateScoreboard = async (currentChatroomId, userId, points) => {
    console.log("controllerParameters", currentChatroomId, userId, points)
    try {
        // Here, you'll need to replace 'knex' with your actual Knex.js instance.
        // You'll also need to replace 'currentChatroomId' with the actual ID of the current chatroom.
        const updatedScore = await Knex("scoreboard")
            .where({ chatroom_id: currentChatroomId, user_id: userId })
            // .increment("score", points)
            .returning("*")

        if (!updatedScore || updatedScore.length === 0) {
            // If the user doesn't have a score entry yet, create one
            await Knex("scoreboard").insert({
                chatroom_id: currentChatroomId,
                user_id: userId,
                score: points,
            })
        }
    } catch (err) {
        console.error("Failed to update scoreboard:", err)
    }
}
