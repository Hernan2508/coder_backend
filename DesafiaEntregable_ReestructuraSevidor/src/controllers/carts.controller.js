


//EP1 Obtener el listado de Carritos
const getCarts = async (req, res) =>{
    try {
        const carts = await cartsManager.getAll(); 
        res.send({status: 'success', payload: carts});
    } catch(error){
        res.status(500).send({ status: 'error', message: error.message})
    }    
};


//EP2 Encontrar un Carrito por Id
const getCartById = async (req, res) =>{
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
};

//EP3 Crear un carrito
const createCart = async (req, res) =>{
    try{
        // Crea un nuevo carrito sin requerir atributos específicos
        const result = await cartsManager.save({});
        res.status(201).send({status: 'success', payload: result }); 

    } catch(error){
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }    
};

export {
    getCarts, getCartById, createCart
}