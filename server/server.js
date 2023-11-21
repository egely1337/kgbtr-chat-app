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
    
})

app.post('/create_message', async (req, res) => {
    try {
        const {
            message,
            author,
            author_image,
            created_at,
            id,
            replyMessageId
        } = req.body;
        
        io.emit('message', {
            message,
            author,
            author_image,
            created_at,
            id,
            replyMessageId
        })

        res.status(200).end();
    } catch(err) {
        return res.json({
            status: false,
            err: err
        })
    }
})

app.post("/delete_message", (req, res) => {
    try {
        const {id} = req.body;
        io.emit("delete", {id});

        res.status(200).end();
    } catch(err) {
        console.err(err);
        return res.json({
            status: false,
            err: err
        })
    }
})

server.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
})



