import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import usersModel from '../dao/dbManagers/models/users.model.js';
import { createHash, isValidPassword, PRIVATE_KEY } from '../utils.js';
import jwt from 'passport-jwt';

//local es auntenticacion con usuario y contraseña
const JWTStrategy = jwt.Strategy;

//Passport si sabe como obtener JWT desde los headers del request
const ExtractJWT = jwt.ExtractJwt;


const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['coderCookieToken']; //auth.routher
    }
    return token;
}

//incializar Passport
const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async(jwt_payload, done) => {
        /*{
             {
                "user": {
                  "name": "prueba",
                  "email": "prueba@gmail.com"
                }
              }
        } */
        try {
            //probando validaciones
            /* if(!jwt_payload.test){
                return done(null, false, { messages: 'error ivalid attribute'});
            } */
            return done(null, jwt_payload.user); //req.user seteamos: name, email
            
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.1f3b18a29320439f',
        clientSecret: 'cb31d66aa11ba46b604b6da37c0f9c2f4a3cea75',
        callbackURL: 'http://localhost:8080/api/sessions/github-callback',
        scope: ['user:email']
     }, async (accessToken, refreshToken, profile , done) => { //el campo username es por defecto en passport
         try {
             console.log(profile);
             /* {
                 _json:{
                     name:hernan
                 }
                 emails: [{value: 'hr@hotmail.com'}]
             } */
 
             const email = profile.emails[0].value;
             const user = await usersModel.findOne({ email });
 
             if(!user){
                 //crear la cuenta o usuario desde 0
                 const newUser = {
                     first_name: profile._json.name,
                     last_name: '',
                     age: 18,
                     email,
                     password:''
                 }
                 
                 const result = await usersModel.create(newUser);
                 return done(null, result); //req.user { first, last, age, email} esto ya lo crea automaticamente
             
             } else {
                 return done(null, user);
             }
                 
         } catch (error) {
             return done(`Incorrect credentials`);
         }
     }));

    //? ------------------------------------------------------------------------------------------
    //? Serializacion y DeSerializacion
    //? ------------------------------------------------------------------------------------------

    //Serialización : es almaceenar el identificador de nuesto usuario
    passport.serializeUser((user, done) =>{ //cada sesión tiene su usuario por eso aplicamos esto, en caso entra en sesión alex, que sea los datos de Alex y no de guillermo
        done(null, user._id);
    });

    // DeSerealización: A partir de ese id, obtener todos los datos relacionados a el cuando lo hicimos en serializacion
    passport.deserializeUser(async(id, done) =>{
        const user = await usersModel.findById(id);
        done(null, user);
    });
}

const passportCall = (strategy) => {
    return async(req, res, next) =>{
        passport.authenticate(strategy, { session: false }, function(err, user, info){
            if(err) return next(err);
            if(!user){
                return res.status(401).send({status: 'error', error: info.messages ? info.messages: info.toString()})
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}


export {
    initializePassport,
    passportCall
}