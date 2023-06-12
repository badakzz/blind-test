import Knex from "../../models/knex"
import { TABLE } from "../utils/constants"
import { Score, Track } from "../utils/types"

export async function incrementScore(
    userId,
    chatroomId,
    points
): Promise<Score> {
    return Knex(TABLE.SCOREBOARD)
        .where({ chatroom_id: chatroomId, user_id: userId })
        .increment("points", points)
        .returning("*")
}

export async function createScore(userId, chatroomId, points): Promise<Score> {
    return Knex("scoreboard").insert({
        chatroom_id: chatroomId,
        user_id: userId,
        points: points,
    })
}

export async function getScoreListByChatroomId(chatroomId): Promise<Score[]> {
    return Knex(TABLE.SCOREBOARD)
        .where({ chatroom_id: chatroomId })
        .join(
            TABLE.USERS,
            `${TABLE.SCOREBOARD}.user_id`,
            `${TABLE.USERS}.user_id`
        )
        .select(`${TABLE.USERS}.user_name`, `${TABLE.SCOREBOARD}.points`)
        .orderBy(`${TABLE.SCOREBOARD}.points`, "desc")
}

export async function getMaxScoreForChatroomId(chatroomId): Promise<number> {
    return Knex(TABLE.SCOREBOARD)
        .where({
            chatroom_id: chatroomId,
        })
        .max("points as max_points")
        .first()
}

// export async function getScoreList(chatroomId): Promise<Score[]> {
//     return Knex(TABLE.SCOREBOARD)
//         .where({
//             chatroom_id: chatroomId,
//         })
//         .select("user_id", "points")
// }

export async function checkIfGuessed(
    userId,
    chatroomId,
    guess,
    type
): Promise<Track> {
    return Knex("guessed_songs")
        .where("user_id", userId)
        .andWhere("chatroom_id", chatroomId)
        .andWhere("guess", guess)
        .andWhere("guess_type", type)
        .first()
}

export async function checkIfAnyUserGuessed(
    chatroomId,
    guess,
    type
): Promise<Track> {
    return Knex("guessed_songs")
        .where("chatroom_id", chatroomId)
        .andWhere("guess", guess)
        .andWhere("guess_type", type)
        .first()
}

export async function recordGuess(
    userId,
    chatroomId,
    guess,
    type
): Promise<Track> {
    return Knex("guessed_songs").insert({
        user_id: userId,
        chatroom_id: chatroomId,
        guess: guess,
        guess_type: type,
    })
}

// check return types
