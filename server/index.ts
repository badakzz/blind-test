import express from "express"
import * as http from "http"
import { Server } from "socket.io"
import { saveChatMessage } from "../controllers/chatMessageController"
import * as dotenv from "dotenv"
dotenv.config({ path: "../env/local.env" })

console.log("saveChatMessage", saveChatMessage)
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

io.on("connection", async (socket) => {
    console.log(`User connected with ID: ${socket.id}`)

    socket.on("joinRoom", (username) => {
        const user = { id: socket.id, username }
        users.push(user)
        io.emit("userConnected", user)
        io.emit("users", users)
        console.log(`User ${username} joined the chatroom`)
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
        console.log(`Received message: ${msg}`)
        console.log(users)
        const user = users.find((u) => u.id === socket.id)
        console.log(user)
        console.log(socket.id)

        if (user) {
            const chatroomId = "1"
            const senderId = socket.id

            // Save the message in the database
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
            io.emit("chatMessage", { author: user.username, message: msg })
        }
    })
})

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
