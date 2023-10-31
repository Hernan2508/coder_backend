// Para MONGODB:de ahí vamos veremos tanto el de router para de productos para archivos y mongodb juntos
import { Router } from 'express';
import Carts from '../dao/dbManagers/carts.manager.js'
/* import Carts from '../dao/fileManagers/carts.manager.js' */

const router = Router();

//Creamos la instacia de la clase
const cartsManager = new Carts()



//Construcción de nuestro servicio o endpoint MongoDB

router.get('/', async (req, res) =>{

    try{
        const carts = await cartsManager.getAll(); 
        res.send({status: 'success', payload: carts});
  
    } catch(error){
        res.status(500).send({ status: 'error', message: error.message})
   }    

});

// Encontrar un carrito por Id

router.get('/:id', async (req, res) =>{

    try {
        const { id } = req.params;

        
        const cart = await cartsManager.getById(id);
        
        if(!cart){
            return res.status(404).send({ status: 'error', message: 'user not found'})
        }
        res.send({ status: 'success', payload: cart})

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message});
    }
});



//Crear un recurso:
router.post('/', async (req, res) =>{

    try{
        const { description, store} = req.body; //Obtenemos los datos del nuevo producto a agregar

        // realizamos la validación
        if(!description || !store){
            //Error del cliente que no envia los atributos obligatorios
            return res.status(400).send({status: 'error', message: 'incomplete values'}); //finalizamos la ejecucioón
        
        } 
    
        const result = await cartsManager.save({
            description,
            store
        }); 

        res.status(201).send({status: 'success', payload: result });
        

    } catch(error){
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
   }    

});


//Eliminar
router.delete('/:id', async (req, res) =>{
    try {

        const { id } = req.params;


        const cart = await cartsManager.getById(id);
        
        if(!cart){
            return res.status(404).send({ status: 'error', message: 'user not found'})
        }
        
        const cartEliminar = await cartsManager.deleteById(id);

        if (cartEliminar) {
            res.send({ status: 'success', message: 'Carrito eliminado con éxito' });
        };
        
    } catch (error) {
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }
})




export default router;