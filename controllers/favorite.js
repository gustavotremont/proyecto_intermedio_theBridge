const Favorite = require("../models/favorite");
const getEmailByToken = require('../utils/getEmailByToken');
const getRoleByToken = require('../utils/getRoleByToken');

const getFavorite = async (req, res) => {
    try {
        const role = getRoleByToken(req.cookies.access_token);

        if(req.query.currectUserEmail) {
            const result = await Favorite.getAllFavoritesByUser(req.query.currectUserEmail);
            res.status(200).render('favorites',{favorites:result, role: role});

        }else{
            const email = getEmailByToken(req.cookies.access_token);
            res.redirect(`/favorites/?currectUserEmail=${email}`);
        }   
        
    } catch (err) {
        res.status(400).redirect('/')
    }
      
};

const createFavorite = async (req, res) => {
    try {
        const email = getEmailByToken(req.cookies.access_token)
        await Favorite.createFavorite(req.body, email);
        res.status(201).json({status: 'create'});        
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const email = getEmailByToken(req.cookies.access_token)
        await Favorite.deleteFavorite(req.body.url, email);
        res.status(201).json({status: 'delete'});
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const favorites = {
    getFavorite,
    createFavorite,
    deleteFavorite
};

module.exports = favorites;
