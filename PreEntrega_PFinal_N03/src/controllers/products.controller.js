//import Products from '../dao/mongo/classes/products.dao.js';
import * as productsService from '../services/products.service.js'

// Creamos la instancia de la clase
//const productsManager = new Products();

// EP1 Obtener el listado de Productos
const getProducts = async (req, res) =>{
    try {
        const { page = 1, limit = 10, sort, field, value } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        };

        const filter = {};
        if (field && value) { //deben existir ambos
            if (field === 'description') {
              filter.description = { $regex: new RegExp(value, 'i') };
            } else if (field === 'stock') {
              filter.stock = parseInt(value);
            }
        }

        //esta limitado a asc y desc
        if (sort === 'asc') {
            options.sort = { price: 1 };
        } else if (sort === 'desc') {
            options.sort = { price: -1 };
        }

        const result = await productsService.getPaginatedProducts(filter, options);

        res.send({status: 'success', payload: result});

    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message})
    }
};

// EP2 Encontrar un Producto por Id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsService.getProductById(id);

        if (!product) {
            return res.status(404).send({ status: 'error', message: 'Product not found' });
        }
        res.send({ status: 'success', payload: product });

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
};

// EP3 Crear un Producto
const saveProduct = async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;

        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            return res.status(400).send({ status: 'error', message: 'Incomplete values' });
        }

        const result = await productsService.saveProduct({
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });

        res.send({ status: 'success', payload: result });

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
};

// EP4 Actualizar un Producto por Id
const updateProduct = async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const { id } = req.params;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return res.status(400).send({ status: 'error', message: 'Incomplete values' });
        }

        const result = await productsService.updateProduct(id, {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });

        res.status(201).send({ status: 'success', payload: result });

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
};

// EP5 Eliminar un Producto por Id
const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsService.getProductById(id);

        if (!product) {
            return res.status(404).send({ status: 'error', message: 'Product not found' });
        }

        const productEliminar = await productsService.deleteProductById(id);
        if (productEliminar) {
            res.send({ status: 'success', message: 'Product deleted successfully' });
        };

    } catch (error) {
        console.error('Error in deleteProductById method:', error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
};

export {
    getProducts, getProductById, saveProduct,
    updateProduct, deleteProductById
};