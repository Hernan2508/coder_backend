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

}