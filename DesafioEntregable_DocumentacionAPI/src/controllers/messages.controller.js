import * as messagesService from '../services/messages.service.js'

//EP1 Obtener el listado de Carritos
const getMessages = async (req, res) =>{
    try {
        const messages = await messagesService.getMessages(); 
        res.send({status: 'success', payload: messages});
    } catch(error){
        res.status(500).send({ status: 'error', message: error.message})
    }    
};

//EP3 Crear un carrito
const saveMessage = async (req, res) =>{
    try{
        const { message } = req.body;
        const result = await messagesService.saveMessage(message);
        res.status(201).send({status: 'success', payload: result }); 

    } catch(error){
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }    
};

export {
    getMessages, saveMessage
}