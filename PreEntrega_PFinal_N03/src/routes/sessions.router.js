import { Router } from 'express';
import passport from 'passport';
import { github, githubCallback, register, failRegister, login, failLogin, logout, getCurrentSession } from '../controllers/sessions.controller.js';

const router = Router();

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), github); // EP1. Autenticación con GitHub
router.get('/current', passport.authenticate('session'), getCurrentSession);
router.get('/github-callback', passport.authenticate('github', { failureRedirect: 'login'}), githubCallback); // EP2. Callback con GitHub
router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), register); // EP3. Registro
router.get('/fail-register', failRegister); // EP4. Fail Registro
router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login' }), login); //EP5 Login
router.get('/fail-login', failLogin); //EP6 Fail Login
router.get('/logout', logout); //EP7 Logout

export default router;