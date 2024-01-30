import CartsDao from '../dao/mongo/classes/carts.dao.js'

export default class CartsRepository {
    constructor(){
        this.dao = new CartsDao();
    }

    // aca se aplica el patrón de diseño dto, revisar neuvamente
    getCarts = async () => {
        const result = await this.dao.getCarts();
        return result;
    }

    getCartById = async (id) =>{
        const result = await this.dao.getCartById(id);
        return result;
    }

    saveCart = async (cart) =>{
        const result = await this.dao.saveCart(cart);
        return result;
    }

    updateCart = async (id, cart) => {
        const result = await this.dao.updateCart(id,cart);
        return result;
    }

    deleteCartById = async (id) =>{
        const result = await this.dao.deleteCartById(id)
        return result;
    }

}