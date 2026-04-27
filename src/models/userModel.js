import db from '../config/db.js';

const createClient = async (clientName , password_hash) => {
    const query = "INSERT INTO clients (client_name, client_password) VALUES(?,?)";
    const [result] = await db.execute(query, [clientName, password_hash]);
    return result;
}

const findByClientName = async (clientName) => {
    const query = "SELECT client_id, client_name, client_password FROM clients WHERE client_name = ?";
    const [rows] = await db.execute(query, [clientName]);
    return rows[0];
}

const findByClientId = async (clientId) => {
    const query = "SELECT client_id, client_name, client_password FROM clients WHERE client_id = ?";
    const [rows] = await db.execute(query, [clientId]);
    return rows[0];
}

const findClientConnections = async (clientId) => {
    const query = "SELECT distinct receiver_id FROM messages WHERE sender_id = ?";
    const [rows] = await db.execute(query, [clientId]);
    return rows;
}

export {createClient, findByClientName, findByClientId, findClientConnections};
