import React, { useState } from 'react'
import { User, Message } from '../../common/types'
import { Socket } from 'socket.io-client'

type Props = {
    messages: Message[]
    user: User
    connectedUsers: User[]
    socket: Socket
}

const ChatMessagesContainer: React.FC<Props> = ({
    messages,
    connectedUsers,
    user,
    socket,
}) => {
    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if (message) {
            socket.emit('chatMessage', message, user.user_id)
            setMessage('')
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
                {connectedUsers.map((user) => user.user_name).join(', ')}
            </div>
        </>
    )
}

export default ChatMessagesContainer
