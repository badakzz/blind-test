import express from "express"
import * as http from "http"
import { Server } from "socket.io"
import { saveChatMessage } from "../controllers/chatroomMessageController"
import { createChatroom } from "../controllers/chatroomController"
import { updateScoreboard } from "../controllers/scoreboardController"
import { getUserById } from "../controllers/userController"
import { generateUniqueId } from "../utils/helpers"
import * as dotenv from "dotenv"

dotenv.config({ path: "../env/local.env" })

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
})

const PORT = process.env.NODE_SERVER_PORT || 3001

const users = []
const chatrooms = []
let scores = {}

io.on("connection", async (socket) => {
    console.log(`User connected with ID: ${socket.id}`)

    socket.on("createRoom", async (username) => {
        const chatroomId = generateUniqueId()
        try {
            await createChatroom(chatroomId)
        } catch (error) {
            console.error("Error creating chatroom:", error.message)
        }
        socket.join(chatroomId)
        const user = { id: socket.id, username, chatroomId }
        users.push(user)
        io.to(chatroomId).emit("userConnected", user)
        io.to(chatroomId).emit("users", users)
        console.log(
            `User ${username} created and joined chatroom ${chatroomId}`
        )
        chatrooms.push(chatroomId)
        socket.emit("chatroomCreated", chatroomId)
    })

    socket.on("joinRoom", (username, chatroomId) => {
        const user = { id: socket.id, username, chatroomId }
        users.push(user)
        const chatroom = chatrooms.find((c) => c === chatroomId)
        if (chatroom) {
            socket.join(chatroomId)
            console.log(
                `User ${username} joined the chatroom with ID: ${chatroomId}`
            )
        } else {
            console.log(`Chatroom with ID: ${chatroomId} not found.`)
        }
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected with ID: ${socket.id}`)
        const index = users.findIndex((u) => u.id === socket.id)
        if (index !== -1) {
            const user = users.splice(index, 1)[0]
            io.emit("userDisconnected", user)
            io.emit("users", users)
            console.log(`User ${user.username} left the chatroom`)
        }
    })

    socket.on("chatMessage", async (msg) => {
        if (msg.author !== "System") {
            const user = users.find((u) => u.id === socket.id)
            if (user) {
                const senderId = socket.id
                const chatroomId = user.chatroomId
                console.log("User and chatroomId:", user, chatroomId)
                try {
                    await saveChatMessage({
                        content: msg,
                        sender_id: senderId,
                        created_at: new Date(),
                        chatroom_id: chatroomId,
                    })
                } catch (error) {
                    console.error("Error saving message:", error.message)
                }
                io.to(chatroomId).emit("chatMessage", {
                    author: user.username,
                    message: msg,
                })
            }
        } else {
            // System message, don't save to DB but broadcast
            console.log("SYSTEM")
            io.emit("chatMessage", msg)
        }
    })

    socket.on(
        "updateScore",
        async (currentChatroomId, userId, points, correctGuessType) => {
            let user = await getUserById(userId)
            updateScoreboard(currentChatroomId, userId, points)
            socket.emit("scoreUpdated", {
                user,
                newScore: points,
                correctGuessType, // pass correctGuessType here
            })
            // Update the score for this user
            scores[userId] = (scores[userId] || 0) + points

            // If the user has reached the winning score, end the game
            if (scores[userId] >= 1) {
                io.to(currentChatroomId).emit("gameOver", scores, userId)
            }
        }
    )
})

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
