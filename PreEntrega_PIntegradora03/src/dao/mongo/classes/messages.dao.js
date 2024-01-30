import messagesModel from '../models/messages.model.js'

export default class Messages {
    constructor(){
        console.log('Working messages with DB');
    }

    getMessages = async () =>{
        const messages = await messagesModel.find().lean() //transformar de BSON
        return messages;
    }

    saveMessage = async(message) => {
        const result = await messagesModel.create(message);
        return result;
    }


}