const http = require('http')
const { Server } = require('socket.io')

const httpServer = http.createServer()
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

const users = []

io.on('connection', (socket) => {
    console.log(`User connected with ID: ${socket.id}`)

    socket.on('joinRoom', (username) => {
        const user = { id: socket.id, username }
        users.push(user)
        io.emit('userConnected', user)
        io.emit('users', users)
        console.log('joinRoom')
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected with ID: ${socket.id}`)
        const index = users.findIndex((u) => u.id === socket.id)
        if (index !== -1) {
            const user = users.splice(index, 1)[0]
            io.emit('userDisconnected', user)
            io.emit('users', users)
        }
    })

    socket.on('chatMessage', (msg) => {
        const user = users.find((u) => u.id === socket.id)
        if (user) {
            console.log('Received message:', msg)
            io.emit('chatMessage', { author: user.username, message: msg })
        }
    })
})

const port = process.env.PORT || 3001
httpServer.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`)
})
