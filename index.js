const express = require('express')

const app = express();
const server = require('http').createServer(app)
app.use(express.static(__dirname+'/client'))

const io = require('socket.io')(server)

io.on('connection',(socket)=>{
    socket.on('newuser',(username)=>{
        socket.broadcast.emit('update',username+" joined the chat")
    })

    socket.on('exituser',(username)=>{
        socket.broadcast.emit('update',username+" left the conversaation")
    })
    socket.on('chat',(message)=>{
        socket.broadcast.emit('chat',message)
    })
})

server.listen(7575,()=>{
    console.log("http://localhost:7575")
})