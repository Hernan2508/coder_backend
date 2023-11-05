const socket = io(); //Conexion con Websockets


// ? --------------------------------
// ? Renderizar Productos por CLiente
// ? --------------------------------


socket.emit('getProducts');


// ? --------------------------------
// ? Agregar Productos por CLiente
// ? --------------------------------

const addProductForm = document.getElementById('add-product-form');

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores de los inputs

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;

    // Crear un objeto con los valores
    const nuevoProducto = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };

    // Enviar el objeto al servidor a través de sockets
    socket.emit('addProduct', nuevoProducto);

    // Limpiar los campos de entrada
    addProductForm.reset();

});


// ? --------------------------------
// ? Eliminar Productos por CLiente
// ? --------------------------------

const deleteProductForm = document.getElementById('delete-product-form');
const productIdInput = document.getElementById('delete-product-by-id');

deleteProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productId = productIdInput.value;

    // Enviar el ID del producto al servidor a través de sockets
    socket.emit('deleteProductById', productId);

    // Limpiar el campo de entrada
    productIdInput.value = '';
});

// * ------------------------------------------
// * Anexar la Lista de Productos en la vista
// * ------------------------------------------

const productList = document.getElementById('product-list');

socket.on('getProducts', products => {
    productList.innerHTML = '';

    products.forEach(product => {
        productList.innerHTML += `
            <div>
                <p>Producto N° ${product.id}</p>
                <ul>
                    <li>producto:  ${product.title}</li>
                    <li>descripción: ${product.description}</li>
                    <li>precio: ${product.price}</li>
                    <li>thumbnail: ${product.thumbnail}</li>
                    <li>codigo: ${product.code}</li>
                    <li>stock: ${product.stock}</li>
                    <li>id: ${product.id}</li>
                </ul>
            </div>
            <hr>
        `;
    });
});