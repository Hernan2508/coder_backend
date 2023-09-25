const {ProductManager} = require('./managers/ProductManager');


//? Test de Validación: 1) Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager('./files/Productos.json');

const env = async() => {
    try {

        //? Test de Validación: 2) Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
        //--------------------------------- Agregar Producto  -------------------------------------------
        const productos = await manager.getProducts();
        // Imprimimos los productos que tenemos
        console.log('----- Lista de Productos ------')
        console.log(productos);


        //? Test de Validación:  3) Se llamará al método “addProduct” con los campos:
        // Aqui coloamos nuevos productos
        const producto = {
            title: 'producto prueba',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
            stock: 25
        }


        //? Test de Validación:  4) El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
        const productoResultadoFinal = await manager.addProduct(producto);
        // Imprimimos los productos que agregamos
        console.log('---Producto Agregado -----')
        console.log(productoResultadoFinal)
        

        //? Test de Validación:  5) Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
        const productosFinal = await manager.getProducts();
        //Imprimimos todos los productos nuevamente
        console.log('---Nueva Lista de Productos -----')
        console.log(productosFinal)


        //? Test de Validación: 6) Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
        //--------------------------------- Buscar Producto Por Id -------------------------------------------
        // Aqui buscamos el producto que deseamos encontrar:
        const productoEncontrado = await manager.getProductById(1);
        console.log('---------Producto Encontrado ---------')
        console.log(productoEncontrado);


        //? Test de Validación: 7) Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
        //--------------------------------- Actualizar Producto  -------------------------------------------
        // Aqui realizamos un update del producto que deseamos por id:
        const productoUpdate = {
            title: 'refrigeradora',
            description: 'limpieza',
            price: 700,
            thumbnail: 'https//refrigeradora.com',
            code: 'prod-03',
            stock: 50
        }
        
        const productoActualizado = await manager.updateProductById(1, productoUpdate);
        console.log('-------- Producto Actualizado-------');
        console.log(productoActualizado);


        //? Test de Validación: 8)  Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.

        //--------------------------------- Eliminar Producto  -------------------------------------------
        // Aqui eliminamos el producto por Id
        /* const productoEliminado = await manager.deleteProductById(1);
        console.log('Producto eliminado:', productoEliminado) */
        


        //? Verificar la Lista de Productos
        // Verificamos si el producto se eliminó
        const ActualizarListaProductos = await manager.getProducts();
        console.log('--------Lista Actualizada de Productos -------');
        console.log(ActualizarListaProductos);
        

    } catch(error) {
        console.error('Error:', error.message);
    }
}

env();