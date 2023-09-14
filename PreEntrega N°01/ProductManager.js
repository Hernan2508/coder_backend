
class ProductManager {

    constructor(){
        this.products = []; 
    }

    // * Metodo para retornar products

    getProducts(){
        return this.products;
    }


    // * Metodo para agregar producto

    addProduct = (title, description, price,  thumbnail, code, stock) => {

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        // Validación 01: para que todos los campos esten llenos


        if(!title || !description || !price || !thumbnail || !code || !stock) {

            console.log("Todos los campos son obligatorios");
            return;
        }

        // Validación 02: Code no se debe repetir

        const codeRegistrado = this.products.some(product => product.code === code); //true O false

        if(codeRegistrado){

            console.log('Producto ya registrado, ingrese otro')

            return;
        }

        // Validación 03: Id autoincrementable

        if ( this.products.length === 0) {

            product.id = 1

        } else {

            product.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(product)
 
    }

    // * Metodo para buscar productos para Id

    getProductById = (id) => {

        const productoEncontrado = this.products.find(product => product.id === id);

        if (productoEncontrado) {
            
            return productoEncontrado; // Retorna el objeto encontrado
    
        } else {
            
            return "Not Found"; // Retorna el mensaje de error
        }
    }  
}



/* Pruebas Locales
const manejadorProductos = new ProductManager();
manejadorProductos.addProduct('licuadora', 'Cocina', 130, 'https//licuadora.com', 'prod-01', 5);
manejadorProductos.addProduct('lavadora', 'Cocina', 230, 'https//abc.com', 'prod-02', 2);
manejadorProductos.addProduct('plancha', 'Cocina', 150, 'https//dsdsd.com', 'prod-02', 3);
manejadorProductos.addProduct('cocina', 'Cocina', 750, 'https//fifa.com', 'prod-03', 1);
manejadorProductos.addProduct('refrigeradora', 'Cocina', 1250, 'https//ps1.com', 'prod-04', 10);
manejadorProductos.addProduct('mesa', 'escolar', 1250, 'https//amazon.com',10);
console.log(manejadorProductos.getProducts());
console.log(manejadorProductos.getProductById(4));
console.log(manejadorProductos.getProductById(8));
console.log(manejadorProductos.getProductById(9)); */


/* Testing */
const manejadorProductos = new ProductManager();
console.log(manejadorProductos.getProducts());
manejadorProductos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(manejadorProductos.getProducts());
manejadorProductos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(manejadorProductos.getProductById(0));
console.log(manejadorProductos.getProductById(1));