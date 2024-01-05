import {promises} from 'fs';

export default class ProductManager {

    constructor(path){
        this.path = path;
    }

    //Vamos a obtener los productos del archivo Productos.json

    getProducts = async () => {
        try {
            
            //Comprobamos si existe el archivo
            await promises.access(this.path);
            
            //en el caso de que exista leeremos su contenido
            const data = await promises.readFile(this.path, 'utf-8');

            //parseamos el JSON para leerlo
            const products = JSON.parse(data);
            return products; //retornamos el arreglo de objetos
            

        } catch (error) {

            if (error.code === 'ENOENT') { //ENOENT es un codigo de error que significa no such file or directory

                // Si el archivo no existe, retornamos un mensaje de error
                throw new Error('El archivo de productos no se encuentra en la ubicación especificada.');
            
            } else {
                // En caso exista otro error
                throw new Error('Error al leer el archivo de productos: ' + error.message);
            }
        }
    }

    
    getProductById = async (id) => {
        try {
            const products = await this.getProducts();
            const ProductoEncontrado = products.find(product => product.id === id);

            if(ProductoEncontrado){
                return ProductoEncontrado; //Retorna el objeto con el producto encontrado
            } else {
                return "Producto No Encontrado"; // Retorna un mensaje de error
            }
        
        } catch (error) {
            throw new Error('Error al buscar el producto por ID: ' + error.message)
        }
        
    }


    createProduct = async (product) =>{
        try{

            const products = await this.getProducts();

            if(products.length === 0){
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1
            }
        
            products.push(product);

            //Escribir el arreglo actualizado
            await promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

            return product//{ success: true, message: 'Producto creado con éxito' };
 
        } catch (error) {

            throw new Error('Error al crear el producto: ' + error.message)
        }

    }


    updateProductById = async (productId, productToUpdate) => {
        try {
            const products = await this.getProducts();
    
            // Buscar el producto por su Id
            const productIndex = products.findIndex((product) => product.id === productId);
    
            if (productIndex !== -1) {
                const product = products[productIndex];
    
                // Actualizar los datos del producto
                Object.assign(product, productToUpdate);
    
                // Escribir el arreglo actualizado
                await promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    
                return { status: 'success', message: 'Producto actualizado' };

            } else {

                return { status: 'error', message: 'Producto no encontrado' };
            }

        } catch (error) {

            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    };

    deleteProductById = async (productId) => {
        try {
            const products = await this.getProducts();

            // Buscar el producto por su Id
            const productIndex = products.findIndex((product) => product.id === productId);

            if (productIndex !== -1) {


                products.splice(productIndex, 1);

                // Escribir el arreglo actualizado
                await promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    
                return { status: 'success', message: 'Producto eliminado' };

            } else {

                return { status: 'error', message: 'Producto no encontrado' };
            }



        } catch (error) {

            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }    

}