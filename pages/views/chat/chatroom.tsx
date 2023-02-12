import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const Chatroom = () => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [chosenUsername, setChosenUsername] = useState('')

    const socket = io('http://localhost:3001')

    useEffect(() => {
        const username = prompt('Please enter your username')
        setChosenUsername(username)
        socket.emit('joinRoom', username)

        socket.on('chatMessage', (msg) => {
            setMessages((currentMsg) => [...currentMsg, msg])
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const sendMessage = () => {
        socket.emit('chatMessage', message)
        setMessages((currentMsg) => [
            ...currentMsg,
            { author: chosenUsername, message },
        ])
        setMessage('')
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
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chatroom
