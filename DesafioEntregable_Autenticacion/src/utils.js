import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

export {
    __dirname,
    createHash,
    isValidPassword
}