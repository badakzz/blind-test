import React, { useState } from "react"
import { User, Message } from "../utils/types"
import { Socket } from "socket.io-client"

type Props = {
    messages: Message[]
    users: User[]
    socket: Socket
}

const ChatMessagesContainer: React.FC<Props> = ({
    messages,
    users,
    socket,
}) => {
    const [message, setMessage] = useState("")

    const sendMessageHandler = () => {
        if (message) {
            socket.emit("chatMessage", message)
            setMessage("")
        }
    }

    return (
        <>
            <div>
                {messages.map((msg, i) => (
                    <div key={i}>
                        <span>{msg.user_name}: </span>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessageHandler}>Send</button>
            </div>
            <div>
                Users online:
                {users.map((user) => user.user_name).join(", ")}
            </div>
        </>
    )
}

export default ChatMessagesContainer
