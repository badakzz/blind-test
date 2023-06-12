import { scoreboardSchema } from "../validation/scoreboardSchema"
import * as ScoreboardDAO from "../dao/ScoreboardDAO"

export const updateScoreboard = async (currentChatroomId, userId, points) => {
    console.log("updateScorePoints", userId, points)
    if (typeof currentChatroomId !== "string") {
        throw new Error(
            `Invalid chatroom_id: ${currentChatroomId}. It should be a string.`
        )
    }
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
        const updatedScore = await ScoreboardDAO.incrementScore(
            userId,
            currentChatroomId,
            points
        )

        if (!updatedScore || updatedScore.points === 0) {
            // If the user doesn't have a score entry yet, create one
            await ScoreboardDAO.createScore(userId, currentChatroomId, points)
        }
        console.log("arabe")
    } catch (err) {
        console.error("Failed to update scoreboard:", err)
    }
}

export const getScoreListByChatroomId = ScoreboardDAO.getScoreListByChatroomId
export const getMaxScoreForChatroomId = ScoreboardDAO.getMaxScoreForChatroomId
export const checkIfUserAlreadyGuessed = ScoreboardDAO.checkIfGuessed
export const checkIfAnyUserAlreadyGuessed = ScoreboardDAO.checkIfAnyUserGuessed
export const recordGuess = ScoreboardDAO.recordGuess
