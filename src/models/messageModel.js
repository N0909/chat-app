import db from '../config/db.js';

const createMessage = async (sender_id, reciever_id, message) => {
    const query = "INSERT INTO messages(sender_id, receiver_id, message) VALUES (?,?,?)";
    const [result] = await db.execute(query,[sender_id, reciever_id, message]);
    return result;
}

const findClientsMessage = async (sender_id, reciever_id) => {
    const query = "SELECT sender_id, receiver_id, message FROM messages WHERE sender_id=? AND receiver_id=?";
    const [result] = await db.execute(query,[sender_id, reciever_id]);
    return result; 
}

export {createMessage, findClientsMessage};
