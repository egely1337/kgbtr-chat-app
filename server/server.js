const bodyParser = require('body-parser');
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

app.use(bodyParser.json());
io.on('connection', (socket) => {
    
    socket.on('message', ({message, author, created_at, author_image}) => {
        io.emit('message', {
            message, 
            author,
            created_at,
            author_image
        })
    });
})

app.post('/create_message', async (req, res) => {
    try {
        const {
            message,
            author,
            author_image,
            created_at,
        } = req.body;
        
        io.emit('message', {
            message,
            author,
            author_image,
            created_at,
        })

        res.status(200).end();
    } catch(err) {
        return res.json({
            status: false,
            err: err
        })
    }
})

server.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
})



