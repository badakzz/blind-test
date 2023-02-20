import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

const Chatroom = () => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [users, setUsers] = useState([])
    const [validatedUsername, setValidatedUsername] = useState(false)
    useEffect(() => {
        socket.on("chatMessage", (msg) => {
            setMessages((currentMsg) => [...currentMsg, msg])
        })

        socket.on("users", (users) => {
            setUsers(users)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const sendMessage = () => {
        if (message) {
            socket.emit("chatMessage", message)
            setMessage("")
        }
    }

    const handleJoinRoom = () => {
        if (username) {
            setValidatedUsername(true)
            console.log("username", username)
            socket.emit("joinRoom", username)
        }
    }

    return (
        <div>
            <h1>Chatroom</h1>
            <div>
                {messages.map((msg, i) => (
                    <div key={i}>
                        <span>{msg.author}: </span>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            {validatedUsername ? (
                <div>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <button onClick={handleJoinRoom}>Join room</button>
                </div>
            )}
            <div>
                Users online: {users.map((user) => user.username).join(", ")}
            </div>
        </div>
    )
}

export default Chatroom
