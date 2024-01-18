import TicketsDao from "../dao/mongo/classes/tickets.dao.js"

export default class TicketsRepository {
    constructor(){
        this.dao = new TicketsDao();
    }

    getTickets = async() => {
        const result = await this.dao.getTickets();
        return result;
    }

    saveTicket = async (ticket) => {
        const result = await this.dao.saveTicket(ticket);
        return result
    }
}