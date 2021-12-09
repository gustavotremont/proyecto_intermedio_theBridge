const Favorite = require("../models/favorite");
const jwt = require("jsonwebtoken");
const getEmailByToken = require('../utils/getEmailByToken')

//http://localhost:3000/favorites/?currectUserEmail=isabela@gmail.com
const getFavorite = async (req, res) => {
    try {
        
        let role = '';
        if(req.cookies.access_token){
            const token = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            role = token.role;
        } 
        if(req.query.currectUserEmail) {
            const result = await Favorite.getAllFavoritesByUser(req.query.currectUserEmail);
            console.log(result);
            res.status(200).render('favorites',{favorites:result, role: role});

        }else{
            const token = req.cookies.access_token
            const data = jwt.verify(token, process.env.JWT_SECRET);
            res.redirect(`/favorites/?currectUserEmail=${data.email}`);
        }   
        
    } catch (err) {
        res.status(400).redirect('/')
    }
      
};

const createFavorite = async (req, res) => {
    try {
        const email = getEmailByToken(req.cookies.access_token)
        await Favorite.createFavorite(req.body, email);
        res.status(201).json({status: 'creado', obj: req.body});        
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const email = getEmailByToken(req.cookies.access_token)
        await Favorite.deleteFavorite(req.body.url, email);
        res.status(201).json({status: 'borrado', obj: req.body});
    } catch (err) {
        res.status(400).redirect('/');
    }
};

const favorites = {
    getFavorite,
    createFavorite,
    deleteFavorite
};

module.exports = favorites;
