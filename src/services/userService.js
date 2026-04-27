import {
  createClient,
  findByClientName,
  findByClientId,
  findClientConnections,
} from "../models/userModel.js";

import bcrypt, { hash } from "bcrypt";

const registerClient = async (clientName, clientPassword) => {
  try {
    const hashed_passsword = await bcrypt.hash(clientPassword, 12);
    const response = await createClient(clientName, hashed_passsword);
    return response;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error("Username Already Exists");
    }
    throw err;
  }
};

const getClientByName = async (clientName) => {
  const response = await findByClientName(clientName);
  if (!response) {
    throw new Error("Username not found");
  }
  return response;
};

const getClientById = async (clientId) => {
  const response = await findByClientId(clientId);
  if (!response) {
    throw new Error("User Id Not Found");
  }
  return response;
};

const getClientConnection = async (clientId)=>{
  const response = await findClientConnections(clientId);
  return response;
}

export { registerClient, getClientByName, getClientById };
