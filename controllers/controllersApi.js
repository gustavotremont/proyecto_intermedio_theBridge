const User = require('../models/user');
const Offer = require('../models/offer')
const bcrypt = require('../utils/cryptPassword')
const getRoleByToken = require('../utils/getRoleByToken') 
const scrapingTe = require('../utils/scraping_tecno')

//funcion para login
const login = async (req, res) => {
    try {
        const role = getRoleByToken(req.cookies.access_token);

        const {loginEmail, loginPassword} = req.body
        let errors = [];

        if(!loginEmail || !loginPassword ) {
            errors.push({msg : "Completa todos los campos"})    
        } 

        if(errors.length > 0 ) {
            res.render('login', {
                errors : errors,
                loginEmail,
                role: role
            })
        } else {
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
                    errors.push({msg : "las contraseñas es incorrecta"})
                    res.status(400).render('login', {errors : errors, loginEmail, role: role})
                }
            } else {
                errors.push({msg : "Usuario no Registrado"})
                res.status(400).render('login', {errors : errors, loginEmail, role: role})
            }
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
        const role = getRoleByToken(req.cookies.access_token);

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
                                            })
        const offersList = [...tecnoSearch, ...mongoSearch]

        res.status(200).render('home', {dataList: offersList, role: role, keyword: keywordSearch, location: locationSearch}) // Devuelve el producto buscado
    } 
    catch(err){
        res.status(400).redirect('/')
    } 
} 

const controllerApi ={
    home,
    login,
    logout,
    listSearch
}

module.exports = controllerApi;