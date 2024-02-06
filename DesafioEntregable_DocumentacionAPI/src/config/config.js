import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.option('--mode <modo>', 'variable de ambiente');
program.parse(); //pasamos a un objeto

//aca podemos recibir DEVELOPMENT O PRODUCTION
const enviroment = program.opts().mode;

dotenv.config({
    path: (enviroment === 'DEVELOPMENT') ? './.env.development' : './.env.production'
}); //inicializar

const configs = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: process.env.PERSISTENCE,
    env: enviroment
};
console.log('Port from config:', configs.port, configs.mongoUrl, configs.persistence);
export default configs;