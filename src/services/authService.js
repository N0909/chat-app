import { getClientByName, getClientById  } from './userService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const verifyClient = async (clientName, clientPassword) => {
    const client = await getClientByName(clientName);
    const client_password = client.client_password;

    const valid = await bcrypt.compare(clientPassword, client_password);

    if (!valid){
        throw new Error("Invalid Credentials");
    }

    const secret_key = process.env.SECRETKEY;

    const payload = {
        "user_id": client.client_id,
        "sub": client.client_name,
        "iat":Date.now(),
        "exp":Date.now()+1000*60*30
    };

    const token = jwt.sign(payload, secret_key, {
        algorithm:"HS256",
    });

    return token;
}

export default verifyClient;