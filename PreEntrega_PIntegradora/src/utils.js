import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


console.log(__filename);
console.log(__dirname); 

export {
    __dirname,
}

