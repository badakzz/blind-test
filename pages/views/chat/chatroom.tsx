import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import { User } from "../../../utils/types/UserType"
import { GetServerSideProps } from "next"
import { withSession } from "../../../utils/helpers/ironSessionHelper"

const socket = io("http://localhost:3001")

interface ChatroomProps {
    user: User | null
}

export const getServerSideProps: GetServerSideProps = withSession(
    async ({ req, res }) => {
        const user = req.session.get("user")

        if (user) {
            return {
                props: {
                    user: user,
                },
            }
        } else {
            return {
                props: {
                    user: null,
                },
            }
        }
    }
)

const Chatroom: React.FC<ChatroomProps> = ({ user }) => {
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState(user ? user.userName : "")
    const [users, setUsers] = useState([])
    const [validatedUsername, setValidatedUsername] = useState(false)

    useEffect(() => {
        const newSocket = io("http://localhost:3001")
        setSocket(newSocket)

        newSocket.on("chatMessage", (msg) => {
            setMessages((currentMsg) => [...currentMsg, msg])
        })

        newSocket.on("users", (users) => {
            setUsers(users)
        })

        return () => {
            newSocket.disconnect()
        }
    }, [])

    const sendMessage = () => {
        if (message) {
            socket.emit("chatMessage", message)
            setMessage("")
        }
    }

    const handleJoinRoom = () => {
        let finalUsername = username

        if (user) {
            finalUsername = user.userName
        } else if (!username) {
            finalUsername = `guest${users.length + 1}`
        }

        setValidatedUsername(true)
        socket.emit("joinRoom", finalUsername)
    }

    console.log("chatroomUser", user)
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
                        readOnly={!!user} // Make the input field read-only when a user is authenticated
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
