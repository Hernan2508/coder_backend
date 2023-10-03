import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//console.log(__dirname);

const productsFilePath = join(__dirname, "./files/productos.json")
const cartsFilePath = join(__dirname, "./files/carritos.json")

console.log(productsFilePath)
//console.log(cartsFilePath)


export {
    productsFilePath,
    cartsFilePath
}