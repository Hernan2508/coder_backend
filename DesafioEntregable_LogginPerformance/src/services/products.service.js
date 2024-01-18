import ProductsRepository from "../repositories/products.repository.js";
import { Products } from "../dao/factory.js";

const productsDao = new Products();
const productsRepository = new ProductsRepository(productsDao);

const getProducts = async() => {
    const result = await productsRepository.getProducts();
    //Logica de negocio
    return result;
}

const getProductById = async (id) => {
    const result = await productsRepository.getProductById(id);
    return result
}

const getPaginatedProducts = async (filter = {}, options = {}) => {
    const result =  await productsRepository.getPaginatedProducts(filter, options);
    return result;
}

const saveProduct = async (product) => {
    const result = await productsRepository.saveProduct(product);
    return result;
}

const updateProduct = async (id, product) => {
    const result = await productsRepository.updateProduct(id, product);
    return result;
}

const deleteProductById = async (id) =>{
    const result = await productsRepository.deleteProductById(id)
    return result;
}

export {
    getProducts,
    getProductById,
    getPaginatedProducts,
    saveProduct,
    updateProduct,
    deleteProductById
};
