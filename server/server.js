const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);  
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
const PORT = 3001;

io.on('connection', (socket) => {
    socket.on('message', ({message, author}) => {
        io.emit('message', {
            message, 
            author
        })
    });
})

server.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
})



