import configs from '../config/config.js';
import messagesModel from './mongo/models/messages.model.js';

const persistence = configs.persistence;

let Carts;
let Products;
let Messages;

try {
    switch (persistence) {
        case 'MONGO':
            console.log('Trabajando con BDD');
            const mongoose = await import('mongoose');
            await mongoose.connect(configs.mongoUrl);
            const { default: CartsMongo } = await import('./mongo/classes/carts.dao.js');
            const { default: ProductsMongo } = await import('./mongo/classes/products.dao.js');
            const { default: MessagesMongo } = await import('./mongo/classes/messages.dao.js');
            Carts = CartsMongo;
            Products = ProductsMongo;
            Messages = MessagesMongo;
            break;
        case 'FILES':
            console.log('Trabajando con archivos');
            const { default: CartsFile } = await import('./file/classes/carts.dao.js');
            const { default: ProductsFile } = await import('./file/classes/products.dao.js');
            const { default: MessagesFile } = await import('./file/classes/messages.dao.js');
            Carts = CartsFile;
            Products = ProductsFile;
            Messages = MessagesFile;
            break;
        default:
            console.error('Tipo de persistencia no reconocido:', persistence); 
            break;
    }
} catch (error) {
    console.error('Error durante la inicialización de factory:', error);
}

export {
    Carts,
    Products,
    Messages
};
