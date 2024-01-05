import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import usersModel from '../dao/mongo/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';

//local es auntenticacion con usuario y contraseña
const LocalStrategy = local.Strategy;

//incializar Passport
const initializePassport = () => {
    // ---------------------------------------------
    //Implementacion de nuestro registro
    // ---------------------------------------------
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, // --> nos permite acceder al objeto request, como cualquier otro middleware
        usernameField: 'email' //por defecto NO, ya que usamos email como usuario
    }, async (req, username, password, done) => { //el campo username es por defecto en passport
        try {
            const { first_name, last_name, age} = req.body; // ya no es necesario colocar el email y el password porque ya lo tomaron
            const user = await usersModel.findOne({email: username});
            
            if(user){
                return done(null, false); //no hay error
            };

            //luego el flujo normal de registro

            const userToSave = {
                first_name,
                last_name,
                email: username,
                age,
                password: createHash(password)
            }

            const result = await usersModel.create(userToSave);
            return done(null, result); //req.user { first, last, age, email} esto ya lo crea automaticamente

        } catch (error) {
            return done(`Incorrect credentials`);
        }
    }));

    // ---------------------------------------------
    //Implementacion de nuestro login
    // ---------------------------------------------

    passport.use('login', new LocalStrategy({
        usernameField: 'email' //por defecto NO, ya que usamos email como usuario
    }, async (username, password, done) => { 
        try {
            const user = await usersModel.findOne({ email: username});

            if(!user || !isValidPassword(password, user.password)){
                return done(null, false);
            }

            return done(null, user); //setea a nivel de nuestro objeto request un objeto user, en caso todo vaya bien

        } catch (error) {
            return done(`Incorrect credentials`);
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

export {
    initializePassport
}