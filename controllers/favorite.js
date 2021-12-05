const Favorite = require("../models/favorite");

//http://localhost:3000/favorites/?currectUserEmail=isabela@gmail.com
const getFavorite = async (req, res) => {
    try {
        if(req.query.currectFavoriteId){
            const favorites = await Favorite.getFavorite(req.query.currectFavoriteId);
            res.status(200).render('favorites',{favorites:favorites});
        }else if(req.query.currectUserEmail) {
            const result = await Favorite.getAllFavoritesByUser(req.query.currectUserEmail);
            res.status(200).render('favorites',{favorites:result});
        }else{
            res.status(400).json({"error":err})
        }   
    } catch (err) {
        res.status(400).json({"error":err})
    }
    
    
};

const createFavorite = async (req, res) => {
    try {
        const result = await Favorite.createFavorite(req.body);
        res.status(201).send("nueva oferta añadida a favoritos");        
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const result = await Favorite.deleteFavorite(req.body.id);
        res.status(200).send("oferta eliminada de favoritos");
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
