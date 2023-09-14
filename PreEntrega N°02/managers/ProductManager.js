const fs = require('fs');

class ProductManager {

    constructor(path){
        this.path = path;
    }

    //Vamos a obtener los productos del archivo Productos.json

    getProducts = async () => {
        try {
            
            //Comprobamos si existe el archivo
            if(fs.existsSync(this.path)){
                //en el caso de que exista leeremos su contenido
                const data = await fs.promises.readFile(this.path, 'utf-8');

                //parseamos el JSON para leerlo
                const products = JSON.parse(data);
                return products; //retornamos el arreglo de objetos
            
            } else {
                return [];
            }

        } catch (error) {
            throw new Error('Error al leer el archivo de productos: ' + error.message);
        }
    }

    addProduct = async (producto) => {
        try {
            // obtener todos los usuarios que tenga almacenado hasta el momento:
            // arreglo de objetos
            const products = await this.getProducts();
            
            //? 01. Validación de todos los campos llenos:

            if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {

                throw new Error("Todos los campos son obligatorios.");
            }

            //? 02. Validación de codigo duplicado

            if (products.some(product => product.code === producto.code)) {
                throw new Error('Ya existe un producto con el mismo código. Por favor, elija un código diferente.');
            }

            //? 03. Validación de Id

            if(products.length === 0){
                producto.id = 1;
            } else {
                producto.id = products[products.length - 1].id + 1;
            }

            // insertamos el elemento
            products.push(producto);

            //una vez que hemos terminado el procesamiento
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return producto;

        } catch (error) {

            throw new Error('Error al agregar el producto: ' + error.message);
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

    updateProductById = async (id, updatedProductData) => {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);

            if (index !== -1 ){
                products[index] = {
                    ...products[index], //creamos una copia del producto con el indice seleccionado sin cambiar el ID
                    ...updatedProductData //sobreescribimos con los campos que deseamos actualizar
                };

                // Guardamos los productos actualizados en el archivo
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

                return products[index]; // retorna el producto Actualizado

            } else {
                throw new Error('Producto no encontrado con el ID proporcionado.');
            }

        } catch (error) {
            throw new Error('Error al actualizar el producto por ID: ' + error.message);

        }
    }
    
    deleteProductById = async (id) => {
        try {
            
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);

            if(index !== -1){
                //Eliminamos el producto del arreglo utilizando splice
                products.splice(index, 1);
            

            // Guardamos los productos actualizados en el archivo
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return "Producto eliminado correctamente"
            
            } else {
                throw new Error('Producto no encontrado con el ID proporcionado');
            }

        } catch (error) {
            throw new Error('Error al eliminar el producto por ID: ' + error.message);
        }
    }

}


module.exports = {
    ProductManager
}
