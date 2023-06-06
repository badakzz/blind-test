import Knex from "../models/knex"
import { TABLE } from "../utils/constants"
import { scoreboardSchema } from "./validation/scoreboardSchema"

export const updateScoreboard = async (currentChatroomId, userId, points) => {
    const { error } = scoreboardSchema.validate(
        {
            user_id: userId,
            chatroom_id: currentChatroomId,
            score: points,
        },
        {
            abortEarly: false,
        }
    )

    if (error) {
        throw new Error(
            "Validation failed: " +
                error.details.map((detail) => detail.message)
        )
    }

    try {
        // Here, you'll need to replace 'knex' with your actual Knex.js instance.
        // You'll also need to replace 'currentChatroomId' with the actual ID of the current chatroom.
        const updatedScore = await Knex(TABLE.SCOREBOARD)
            .where({ chatroom_id: currentChatroomId, user_id: userId })
            .increment("score", points)
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
