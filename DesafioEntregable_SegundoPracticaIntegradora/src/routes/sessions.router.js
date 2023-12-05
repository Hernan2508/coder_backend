import { Router } from 'express';
import usersModel from '../dao/dbManagers/models/users.model.js';
import passport from 'passport';
import { createHash, isValidPassword } from '../utils.js';
import { passportCall } from '../config/passport.config.js';
import { generateToken, authorization } from '../utils.js';

const router = Router();

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res) =>{
    res.send({ status: 'success', message: 'user registered'});
});

router.get('/github-callback', passportCall('github'), async (req, res) => {
    try {
        const token = generateToken(req.user);
        res.cookie('coderCookieToken', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

//-------------------------------------------------------------------------------------------------------------------

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const user = await usersModel.findOne({ email });

        if (user) {
            return res.status(400).send({ status: 'error', message: 'User already exists' });
        }

        const newUser = {
            first_name,
            last_name,
            email,
            age: 18,
            password: createHash(password),
        };

        const result = await usersModel.create(newUser);

        const token = generateToken(result);
        res.cookie('coderCookieToken', token, { httpOnly: true });
        res.status(201).send({ status: 'success', message: 'User registered', access_token: token });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

router.get('/fail-register', async (req, res) => {
    res.status(500).send({ status: 'error', message: 'register fail' });
});


router.post('/login', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email });

        if (!user || !isValidPassword(password, user.password)) {
            return res.status(401).send({ status: 'error', message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.cookie('coderCookieToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.send({ status: 'success', message: 'Login success', access_token: token });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

router.get('/fail-login', async (req, res) => {
    res.status(500).send({ status: 'error', message: 'login fail' });
});

router.get('/logout', (req, res) => {
    res.clearCookie('coderCookieToken');
    res.redirect('/');
});

export default router;