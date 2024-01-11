import ProductsDao from "../dao/mongo/classes/products.dao.js"

export default class ProductsRepository {
    constructor(){
        this.dao = new ProductsDao();
    }

    // aplicar patron de diseño dao
    getProducts = async() => {
        const result = await this.dao.getProducts();
        return result;
    }

    getProductById = async (id) => {
        const result = await this.dao.getProductById(id);
        return result
    }

    getPaginatedProducts = async (filter = {}, options = {}) => {
        const result = await this.dao.getPaginatedProducts(filter, options)
        return result
    }

    saveProduct = async (product) => {
        const result = await this.dao.saveProduct(product);
        return result;
    };

    updateProduct = async (id, product) => {
        const result = await this.dao.updateProduct(id, product);
        return result;
    };

    deleteProductById = async (id) =>{
        const result = await this.dao.deleteProductById(id)
        return result;
    };

}