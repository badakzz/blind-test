import Knex from "../models/knex"
import { TABLE } from "../utils/constants"
import { scoreboardSchema } from "./validation/scoreboardSchema"
import { Score } from "../utils/types"

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

export const getScoresByChatroom = async (
    chatroomId: number
): Promise<Score[]> => {
    const scores = await Knex(TABLE.SCOREBOARD)
        .where({ chatroom_id: chatroomId })
        .join(
            TABLE.USERS,
            `${TABLE.SCOREBOARD}.user_id`,
            `${TABLE.USERS}.user_id`
        )
        .select(`${TABLE.USERS}.user_name`, `${TABLE.SCOREBOARD}.points`)
        .orderBy(`${TABLE.SCOREBOARD}.points`, "desc")

    return scores
}
