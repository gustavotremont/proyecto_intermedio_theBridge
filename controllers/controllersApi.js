const User = require('../models/user');
const bcrypt = require('../utils/cryptPassword')
const jwt = require('jsonwebtoken'); //import jwt from 'jsonwebtoken'; 

require('../auth/auth');

//Funcion que pinta nuestros datos en home
const home = (req,res) =>{
    res.render('home')
}

//funcion para login
const login = async (req, res) => {
    try {
        const user = await User.getUser(req.body.loginEmail);
        if (user) {
            const passwordMatch = await bcrypt.verifyPassword(req.body.loginPassword, user.user_password)
            if (passwordMatch) {
                
                const token = jwt.sign({ email: user.user_email, role: user.user_type }, process.env.JWT_SECRET, {
                    expiresIn: '1d'
                });

                res.cookie('access_token', token, {
                    expires: new Date(Date.now() + 18000000),
                    secure: false, // set to true if your using https
                    httpOnly: true,
                })
                .status(200)
                .redirect('/')
            }else {
                res.status(400).redirect('/login', {"error":'las contraseñas no coinciden'})
            }
        } else {
            res.status(400).redirect('/login', {"error":'Usuario no Registrado'})
        }
    } catch (error) {
        res.status(400).redirect('/login', {"error":error})
    }
}

//funcion para logout
const logout = (req, res) => {
    if (req.cookies['access_token']) {
        res
        .clearCookie('access_token')
        .status(200)
        .json({
            message: 'Sesion Finalizada!'
        })
    } else {
        res.status(401).json({
            error: 'Invalid jwt'
        })
    }
}

//Esperar al scrapping
// const listSearch = async (req, res) => {
//     try{
//         let  dataSearch = await Offer.find({'title': req.body.title}) // quita los campos _id y __v
//         res.status(200).json(dataSearch) // Devuelve el producto buscado
//         } 
//     catch(err){
//         res.status(400).json({"error":err})
    
//     } 
// } 

const controllerApi ={
    home,
    login,
    logout,
}

module.exports = controllerApi;