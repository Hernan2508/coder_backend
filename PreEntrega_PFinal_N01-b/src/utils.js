import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productsFilePath = join(__dirname, "./files/productos.json")
const cartsFilePath = join(__dirname, "./files/carritos.json")


console.log(__filename);
console.log(__dirname); 

export {
    __dirname,
    productsFilePath,
    cartsFilePath
}

