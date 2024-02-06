import winston from 'winston';
import configs from '../config/config.js';

const customLevelOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: 'blue',
        http: 'cyan',   
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta'
    }
};

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: configs.env === 'DEVELOPMENT' ? 'debug' : 'info',
            format: winston.format.combine(
                winston.format.colorize({
                    all: true,
                    colors: customLevelOptions.colors
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'errors.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});

// Agrega un mensaje de prueba
logger.debug(`Este es un mensaje de prueba desde el logger de ${configs.env}.`);


export const addLogger = (req, res, next) => {
    req.logger = logger;
    /* req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`); */
    req.logger.info(`Logger middleware applied for ${req.method} on ${req.url} - ${new Date().toISOString()}`);
    next();
};