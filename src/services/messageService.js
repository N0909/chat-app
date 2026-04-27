import { createMessage, findClientsMessage } from "../models/messageModel.js";

const storeMessage = async (sender_id, receiver_id, message) => {
  try {
    const response = await createMessage(sender_id, receiver_id, message);
    return response;
  } catch (err) {
    if (err === "ER_NO_REFERENCED_ROW_2") {
      throw new Error("Sender or Receiver Doesn't exist");
    }
    throw err;
  }
};

const getMessages = async (sender_id, receiver_id) => {
  const response = await findClientsMessage(sender_id, receiver_id);
  return response;
};

export {storeMessage, getMessages};


