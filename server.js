import express from "express"
import http from "http"
import { Server } from "socket.io"

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

const PORT = process.env.PORT || 3001

const users = []

io.on("connection", (socket) => {
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

    socket.on("chatMessage", (msg) => {
        console.log(`Received message: ${msg}`)
        console.log(users)
        const user = users.find((u) => u.id === socket.id)
        console.log(user)
        console.log(socket.id)

        if (user) {
            io.emit("chatMessage", { author: user.username, message: msg })
        }
    })
})

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
