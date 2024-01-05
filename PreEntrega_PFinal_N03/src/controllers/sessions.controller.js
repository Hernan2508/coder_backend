import buildUserDTO from '../DTOs/users.dto.js'

// EP1. Autenticación con GitHub
const github = async(req, res) =>{
    res.send({ status: 'success', message: 'user registered'});
};

// EP2. Callback con GitHub
const githubCallback = async(req, res) =>{
    req.session.user = req.user;
    res.redirect('/');
};

// EP3. Registro
const register = async (req, res) => {
    res.status(201).send({ status: 'success', message: 'user registered' });
};

// EP4. Fail Registro
const failRegister = async (req, res) => {
    res.status(500).send({ status: 'error', message: 'register fail' });
};

//EP5 Login
const login =  async (req, res) => {
    if(!req.user) {
        return res.status(401).send({ status: 'error', message: 'invalid credentials' })
    }

    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age
    }

    res.send({ status: 'success', message: 'login success' })
};

//EP6 Fail Login
const failLogin = async (req, res) => {
    res.status(500).send({ status: 'error', message: 'login fail' });
};

//EP7 Logout
const logout = (req, res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).send({ status: 'error', message: error.message });
        res.redirect('/');
    })
};

//EP8 Datos del current sessions
const getCurrentSession = (req, res) => {
    try {
      const currentUser = req.user;
      if (!currentUser) {
        return res.status(401).send({ status: 'error', message: 'No user authenticated' });
      }

      //Implementación de patrón DTO
      const userDTO = buildUserDTO(currentUser);

      res.send({ status: 'success', user: userDTO });
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message });
    }
};

export {
    github, githubCallback, register, failRegister, login, failLogin, logout, getCurrentSession
}