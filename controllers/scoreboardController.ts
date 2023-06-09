import Knex from "../models/knex"
import { TABLE } from "../utils/constants"
import { scoreboardSchema } from "./validation/scoreboardSchema"
import { Score } from "../utils/types"

export const updateScoreboard = async (currentChatroomId, userId, points) => {
    console.log("updateScorePoints", points)
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
        const updatedScore = await Knex(TABLE.SCOREBOARD)
            .where({ chatroom_id: currentChatroomId, user_id: userId })
            .increment("points", points)
            .returning("*")

        if (!updatedScore || updatedScore.length === 0) {
            // If the user doesn't have a score entry yet, create one
            await Knex("scoreboard").insert({
                chatroom_id: currentChatroomId,
                user_id: userId,
                points: points,
            })
        }
    } catch (err) {
        console.error("Failed to update scoreboard:", err)
    }
}

export const getScoresByChatroom = async (
    chatroomId: string
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

export const getMaxScoreForChatroomId = async (
    chatroomId: string
): Promise<number> => {
    const maxScore = await Knex(TABLE.SCOREBOARD)
        .where({
            chatroom_id: chatroomId,
        })
        .max("points as max_points")
        .first()

    return maxScore.max_points
}

export const getScoreListByChatroomId = async (
    chatroomId: number
): Promise<Score[]> => {
    const scores: Score[] = await Knex(TABLE.SCOREBOARD)
        .where({
            chatroom_id: chatroomId,
        })
        .select("user_id", "points")

    return scores
}

export const checkIfUserAlreadyGuessed = async (
    userId,
    chatroomId,
    guess,
    type
) => {
    const record = await Knex("guessed_songs")
        .where("user_id", userId)
        .andWhere("chatroom_id", chatroomId)
        .andWhere("guess", guess)
        .andWhere("guess_type", type)
        .first()

    return !!record // returns true if a record exists, false otherwise
}

export const checkIfAnyUserAlreadyGuessed = async (chatroomId, guess, type) => {
    const record = await Knex("guessed_songs")
        .where("chatroom_id", chatroomId)
        .andWhere("guess", guess)
        .andWhere("guess_type", type)
        .first()

    return !!record // returns true if a record exists, false otherwise
}

export const recordGuess = async (userId, chatroomId, guess, type) => {
    console.log({ userId: userId, guess: guess, type: type })
    return Knex("guessed_songs").insert({
        user_id: userId,
        chatroom_id: chatroomId,
        guess: guess,
        guess_type: type,
    })
}
