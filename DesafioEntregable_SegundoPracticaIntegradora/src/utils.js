import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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


// Implementación de JWT
const PRIVATE_KEY = 'coder55575'


//Implementacion de la generación del JWT y la validación
// TOKEN : 2323H35465KJH454U5H45J4

const generateToken = (user) =>{
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn:'24h'})
    return token;
}

//Middleware:
//Autenticacion primer paso lo hace passport

//ya tendriamos el req.user = {}


const authorization = (role) => {
    return async(req, res, next) =>{
        if(req.user.role !== role) return res.status(403).send({status: 'error', message: 'not permissions'});
        next();
    }
} 



console.log(__filename);
console.log(__dirname); 

export {
    generateToken,
    PRIVATE_KEY,
    authorization,
    __dirname,
    createHash,
    isValidPassword,
}