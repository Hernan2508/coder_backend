// Para MONGODB 
// de ahí vamos veremos tanto el de router para de productos para archivos y mongodb juntos
import { Router } from 'express';
import Products from '../dao/dbManagers/products.manager.js'
import { productsModel } from '../dao/dbManagers/models/products.model.js';
/* import Products from '../dao/fileManagers/products.manager.js' */

const router = Router();

//Creamos la instacia de la clase
const productsManager = new Products()


//Construcción de nuestro servicio o endpoint MongoDB

/* router.get('/', async (req, res) =>{

    try{
        const products = await productsManager.getAll(); 
        res.send({status: 'success', payload: products});
  
    } catch(error){
        res.status(500).send({ status: 'error', message: error.message})
   }    

});
 */

// ? PreEntrega Final 2: endpoints nuevos

router.get('/', async (req, res) =>{
    
    try {
        
        const { page = 1, limit = 10, sort, field, value } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        };

        const filter = {};
        
        if (field && value) { //deben existir ambos

            if (field === 'description') {

              filter.description = { $regex: new RegExp(value, 'i') };

            } else if (field === 'stock') {

              filter.stock = parseInt(value);

            }

        }

        //esta limitado a asc y desc
        if (sort === 'asc') {
            options.sort = { price: 1 };
        } else if (sort === 'desc') {
            options.sort = { price: -1 };
        }

        const result = await productsModel.paginate(filter, options);

        res.send({status: 'success', payload: result});

    } catch (error) {

        res.status(500).send({ status: 'error', message: error.message})

    }
});


// ? Fin PreEntrega Final 2



router.get('/:id', async (req, res) =>{

    try {
        const { id } = req.params;

        
        const product = await productsManager.getById(id);
        
        if(!product){
            return res.status(404).send({ status: 'error', message: 'user not found'})
        }
        res.send({ status: 'success', payload: product})

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message});
    }
});





//Crear un recurso:
router.post('/', async (req, res) =>{

    try{
        const { title, description, price, thumbnail, code, stock} = req.body; //Obtenemos los datos del nuevo producto a agregar

        // realizamos la validación
        if(!title || !description || !price || !thumbnail || !code || stock === undefined){
            //Error del cliente que no envia los atributos obligatorios
            return res.status(400).send({status: 'error', message: 'incomplete values'}); //finalizamos la ejecucioón
        
        } 
    
        const result = await productsManager.save({
            title,
            description,
            price,
            thumbnail,
            code,
            stock

        }); 

        res.send({status: 'success', payload: result });
        

    } catch(error){
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
   }    

});


//Actualizar un recurso
router.put('/:id', async (req, res) =>{
    try {
        const { title, description, price, thumbnail, code, stock} = req.body; //Obtenemos los datos del nuevo producto a agregar
        const { id } = req.params;


        if(!title || !description || !price || !thumbnail || !code || !stock){
            //Error del cliente que no envia los atributos obligatorios
            return res.status(400).send({status: 'error', message: 'incomplete values'}); //finalizamos la ejecucioón
        } 

        const result = await productsManager.update(id, {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });

        res.status(201).send({status: 'success', payload: result });

    } catch (error) {
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }

});

//Eliminar
router.delete('/:id', async (req, res) =>{
    try {

        const { id } = req.params;


        const product = await productsManager.getById(id);
        
        if(!product){
            return res.status(404).send({ status: 'error', message: 'user not found'})
        }
        
        const productEliminar = await productsManager.deleteById(id);

        if (productEliminar) {
            res.send({ status: 'success', message: 'Producto eliminado con éxito' });
        };
        
    } catch (error) {
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }
})



export default router;