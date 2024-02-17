import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcrypt';
import { fakerES as faker } from '@faker-js/faker'; //ES español
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __mainDirname = path.join(__dirname, '..') //navegar hacia atras antes del src

//1. Metodo para hashear nuestra contraseña
const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    //contraseña: 1234
    // as4$#sadassd

//2. Metodo para validar el password|| plain serefiere a la contraseña que se va a enviar
const isValidPassword = (plainPassword, hasedPassword) =>
    bcrypt.compareSync(plainPassword, hasedPassword);

console.log(__filename);
console.log(__dirname); 

//3. Mockup para productos con Faker
const generateProducts = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.string.alphanumeric(6),
        stock: faker.number.int(),
        cart: []
    };
}

/* Prueba individual para generar productos
const testGenerateProducts = () => {
    const products = generateProducts();
    console.log('Generated Products:', products);
};
 Ejecutar la prueba
testGenerateProducts();
*/
export {
    __dirname,
    __mainDirname,
    createHash,
    isValidPassword,
    generateProducts
}