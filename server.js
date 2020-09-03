const express = require('express')
const path = require('path')
const socket = require('socket.io')
const connectDB = require('./config/db')

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json())

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/chat', require('./routes/api/chat'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//Server
const PORT = process.env.PORT || 5000

var server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
)

//Socket.io
const io = socket(server)

io.on('connection', (socket) => {
  socket.on('send message', (body) => {
    io.emit('message', body)
  })
})
