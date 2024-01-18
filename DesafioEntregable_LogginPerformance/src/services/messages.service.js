import MessagesRepository from "../repositories/messages.repository.js";
import { Messages } from "../dao/factory.js";

const messagesDao = new Messages();
const messagesRepository = new MessagesRepository(messagesDao);

const getMessages = async() => {
    const result = await messagesRepository.getMessages();
    //Logica de negocio
    return result;
}

const saveMessage = async (message) => {
    const result = await messagesRepository.saveMessage(message);
    return result
}

export {
    getMessages,
    saveMessage
};