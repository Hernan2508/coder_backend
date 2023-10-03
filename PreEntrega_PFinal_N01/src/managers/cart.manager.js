import {promises} from 'fs';

export default class CartManager {

    constructor(path){
        this.path = path;
    }

        //Vamos a obtener los carritos de carts.json

    getCarts = async () => {
        try {
            
            //Comprobamos si existe el archivo
            await promises.access(this.path);
            
            //en el caso de que exista leeremos su contenido
            const data = await promises.readFile(this.path, 'utf-8');

            //parseamos el JSON para leerlo
            const carts = JSON.parse(data);
            return carts; //retornamos el arreglo de objetos
            

        } catch (error) {

            if (error.code === 'ENOENT') { //ENOENT es un codigo de error que significa no such file or directory

                // Si el archivo no existe, retornamos un mensaje de error
                throw new Error('El archivo de carritos no se encuentra en la ubicación especificada.');
            
            } else {
                // En caso exista otro error
                throw new Error('Error al leer el archivo de carritos: ' + error.message);
            }
        }
    }



    getCartById = async (id) => {
        try {
            const carts = await this.getCarts();
            const carritoEncontrado = carts.find(cart => cart.id === id);

            if(carritoEncontrado){
                return carritoEncontrado; //Retorna el objeto con el carrito encontrado
            } else {
                return "Carrito No Encontrado"; // Retorna un mensaje de error
            }
        
        } catch (error) {
            throw new Error('Error al buscar el carrito por ID: ' + error.message)
        }
        
    }


    createCart = async (cart) =>{
        try{

            const cart = {
                id: undefined,
                products: []
            };

            const carts = await this.getCarts();

            if(carts.length === 0){
                cart.id = 1;
            } else {
                cart.id = carts[carts.length - 1].id + 1
            }
        
            carts.push(cart);

            //Escribir el arreglo actualizado
            await promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))

            return cart//{ success: true, message: 'Carrito creado con éxito' };
 
        } catch (error) {

            throw new Error('Error al crear el carrito: ' + error.message)
        }

    }


    getProductByIdInCart = async (cartId, productId) => {
    
        try{

            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === cartId);

            //Validación para ver si el carrito existe o no
            if(!cart){
                return "Carrito No Encontrado"
            }

            const products = cart.products;
            const productIndex = products.findIndex(product => product.id === productId);

            if(productIndex !== -1){
                return products[productIndex].id // Solo retornamos el ID del producto
            } else {
                return "Producto No Encontrado"; // Retorna un mensaje de error si el producto no está en el carrito
            }

        } catch (error) {

            throw new Error('Error al buscar el producto por ID en el carrito: ' + error.message)
        }
    
    
    }

    updateCartById = async(cartId, updateCart) =>{
        try {
            const carts = await this.getCarts();
    
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
    
            if (cartIndex !== -1) {
                carts[cartIndex] = updateCart;
    
                //Escribir el arreglo actualizado
                await promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
    
                return { status: 'success', message: 'Carrito actualizado con éxito' };
            } else {
                return { status: 'error', message: 'Carrito no encontrado' };
            }
        } catch (error) {
            
            throw new Error('Error al actualizar el carrito: ' + error.message);
        }

    }


}