import MessagesDao from "../dao/mongo/classes/messages.dao.js"

export default class MessagesRepository {
    constructor(){
        this.dao = new MessagesDao();
    }

    getMessages = async() => {
        const result = await this.dao.getMessages();
        return result;
    }

    saveMessage = async (message) => {
        const result = await this.dao.saveMessage(message);
        return result
    }
}