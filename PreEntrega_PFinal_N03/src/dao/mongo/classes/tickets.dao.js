import ticketsModel from '../models/tickets.model.js'

export default class Tickets {
    constructor(){
        console.log('Working tickets with DB');
    }

    getTickets = async () =>{
        const tickets = await ticketsModel.find().lean() //transformar de BSON
        return tickets;
    }

    saveTicket = async (ticket) => {
        const result = await ticketsModel.create(ticket);
        return result;
    }


}