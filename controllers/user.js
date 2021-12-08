const User = require("../models/user");
const jwt = require("jsonwebtoken");
const getEmailByToken = require('../utils/getEmailByToken')

const createUser = async (req, res) => {
    try {

        const {userName, userEmail, userPassword, userPassword2, userAge, userTlf, userDni} = req.body;

        let errors = [];

        if(!userName || !userEmail || !userPassword || !userPassword2 || !userAge || !userTlf || !userDni) {
            errors.push({msg : "Completa todos los campos"})
        }

        //check if match
        if(userPassword !== userPassword2) {
            errors.push({msg : "Las contraseñas no coinciden"});
        }

        if(userAge < 18 ) {
            errors.push({msg : 'Tienes que ser mayor de edad para registrarte'})
        }

        if(userTlf.length != 9 ) {
            errors.push({msg : 'El numero de tlf tiene que tener 9 digitos'})
        }

        if(userDni.length != 9 ) {
            errors.push({msg : 'El DNI tiene que tener 9 digitos'})
        }

        if(errors.length > 0 ) {
            res.render('signup', {
                errors : errors,
                userName,
                userEmail,
                userPassword,
                userPassword2,
                userAge,
                userTlf,
                userDni
            })
        }else {
            const emailAlredyExist = await User.getUser(userEmail);
            if (emailAlredyExist) {
                errors.push({msg : 'ya existe una cuenta asociada a este email, prueba con otro'})
                res.render('signup', {
                    errors : errors,
                    userName,
                    userEmail,
                    userPassword,
                    userPassword2,
                    userAge,
                    userTlf,
                    userDni
                })
            } else {
                const result = await User.createUser(req.body);

                if (result === 1) {
                    res.status(201).redirect('/login');
                } else {
                    res.status(400).redirect('/signup')
                }
            }
        }
    } catch (err) {
        res.status(400).redirect('/signup')
    }    
};

const getUser = async (req, res) => {
    try {
        let role = '';
        if(req.cookies.access_token){
            const token = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            role = token.role;
        }
                
        if (req.params.action === 'create') {
            res.status(200).render('userCreate',{data, role: role});
        } 

        else if(req.params.action === 'edit'){

            if (req.query.currentUserEmail) {
                result = await User.getUser(req.query.currentUserEmail);
                res.status(200).render('userEdit', {user: result});
            } 
            else {
                res.status(400).redirect('/');
            }
        }
    
        else {
            result = await User.getAllUsers()
            res.status(200).render('users', {users:result});

        }      
    } catch (err) {
        res.status(400).redirect('/');
    }
};

const getProfile = async (req, res) => {
    try {
        let role = '';
        if(req.cookies.access_token){
            const token = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            role = token.role;
        }

        if (req.params.email) {
                const result = await User.getUser(req.params.email);
                const data = {
                    name: result.user_name,
                    email: result.user_email,
                    age: result.user_age,
                    tlf: result.user_tlf,
                    dni: result.user_dni
                }
                if (req.params.action==='edit') {
                    res.status(200).render('profileEdit', {data, role: role});
                }else {
                    res.status(200).render('profile', data);
                }
        } else {
            const email = getEmailByToken(req.cookies.access_token)
            res.redirect(`/profile/${email}/`);
        }        
    } catch (err) {
        res.status(400).redirect('/')
    }
};

const deleteUser = async (req, res) => {
    try {   

        if(req.query.currentUserEmail){
            await User.deleteUser(req.query.currentUserEmail);
            res.status(200).redirect('/user')
        } else {
            res.status(400).redirect('/')
        }  
    } catch (err) {
        res.status(400).redirect('/')
    }
};

const updateUser = async (req, res) => {
    try {        
          
        if(req.query.currentUserEmail){
            await User.updateUser(req.body, req.query.currentUserEmail);
            res.status(200).redirect('/');
        }else {
            res.status(400).redirect('/')
        }     
    } catch (err) {
        res.status(400).redirect('/')
    }
};

const users = {
    createUser,
    getUser,
    getProfile,
    deleteUser,
    updateUser,
};

module.exports = users;