import TicketsRepository from "../repositories/tickets.repository.js";
import { Tickets } from "../dao/factory.js";
import { v4 as uuidv4 } from 'uuid';

const ticketsDao = new Tickets();
const ticketsRepository = new TicketsRepository(ticketsDao);

const generatePurchase = async (user, amount) => {
    const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount,
        purchaser: user.email
    }

    const result = await ticketsRepository.saveTicket(newTicket);
    return result
}

const getTickets = async() => {
    const result = await ticketsRepository.getTickets();
    //Logica de negocio
    return result;
}

const saveTicket = async (ticket) => {
    const result = await ticketsRepository.saveTicket(ticket);
    return result
}

export {
    generatePurchase,
    getTickets,
    saveTicket
};