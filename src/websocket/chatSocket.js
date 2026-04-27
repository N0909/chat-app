import {WebSocketServer} from 'ws';
import { storeMessage } from '../services/messageService.js';

const wss = new WebSocketServer({port:8000});
const users = new Map();

console.log(`Running on port 8000`);
wss.on("connection", (socket)=>{
    
    socket.on("message", async (data)=>{
        const json_data = JSON.parse(data);

        if (json_data.type==="CONNECT"){
            users.set(json_data.client_id, socket);
            socket.send(JSON.stringify({"title":"you are connected", "your_message":json_data.message}));
        }

        if (json_data.type==="MESSAGE"){

            const message = {
                "sender_id": json_data.client_id,
                "receiver_id": json_data.receiver_id,
                "message": json_data.message
            };

            await storeMessage(message.sender_id, message.receiver_id, message.message);
            const receiver_socket = users.get(json_data.receiver_id);

            if (receiver_socket){
                receiver_socket.send(JSON.stringify(message));
            }

        }
    });
});