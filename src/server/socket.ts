import io from "socket.io-client";
const socket = io(process.env.WEBSOCKET_URL);

socket.on('disconnect', () => {
    console.log("disconnected, trying reconnect.");
    socket.connect();
})

export default socket;