const User = require('../models/user');
const bcrypt = require('../utils/cryptPassword')
const jwt = require('jsonwebtoken'); //import jwt from 'jsonwebtoken'; 
const Offer = require('../models/offer')
const scrapingTe = require('../utils/scraping_tecno')

require('../auth/auth');

//Funcion que pinta nuestros datos en home
const home = (req,res) =>{
    res.render('home')
}

//funcion para login
const login = async (req, res) => {
    try {
        if(userName = '' ) {
            errors.push({msg : "Completa todos los campos"})
        }
        if(userPassword = '' ) {
            errors.push({msg : "Completa todos los campos"})
        }
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
        .redirect('/')
    } else {
        res.status(401).redirect('/')
    }
}

// Esperar al scrapping
const listSearch = async (req, res) => {
    try{
        const {keywordSearch, locationSearch} = req.query
        const tecnoSearch = await scrapingTe(keywordSearch, locationSearch)
        const mongoSearch = await Offer.find({
                                                $and: [
                                                    { $or: [
                                                        {"title": { "$regex": keywordSearch, "$options": "i" } }, 
                                                        {"description": { "$regex": keywordSearch, "$options": "i" } }
                                                    ]},
                                                    { "location": { "$regex": locationSearch, "$options": "i" } }
                                                ]
                                            }) // quita los campos _id y __v
        const offersList = [...tecnoSearch, ...mongoSearch]

        let role = '';
        if(req.cookies.access_token){
            const token = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            role = token.role;
        }

        res.status(200).render('home', {dataList: offersList, role: role, keyword: keywordSearch, location: locationSearch}) // Devuelve el producto buscado
    } 
    catch(err){
        res.status(400).json({"error":err})
    
    } 
} 

const controllerApi ={
    home,
    login,
    logout,
    listSearch
}

module.exports = controllerApi;