const dataOffer = require('../utils/dbMongo')
const Offer = require('../models/offer')

//Funcion que pinta nuestros datos en home
const home = (req,res) =>{
    res.json()
}

// funcion para registrarse en la api
const register = ( req, res) => {
    const dataRegister = {
        "email": "mm@gmail.com",
        "password": "123456",
        "Nombre":"Maria",
        "Apellidos":"Garcia",
        "cv":"curriculum"
    }
    return res.status(200).json(dataRegister) //devuelven los datos del json
}

//funcion para login
const login = (req, res) => {
    const dataLogin = {
        "email": "mm@gmail.com",
        "password": "123456"
    }
    return res.status(200).json(dataLogin)
}

//funcion para logout
const logout = (req, res) => {
    const dataLogout = {
        "email": "mm@gmail.com",
        "password": "123456"
    }
    return res.status(200).json(dataLogout)
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

//MongoDB ----funcion para crear oferta
const createOffer = async (req,res) => {
    try{
        const offer = new Offer(req.body); // Genero el nuevo documento
        const result = await offer.save(); // Lo guarda en BBDD
        res.status(201).json(result);
    } catch(err){
        res.status(400).json({"error":err})
    }  
}

// // MONGOSB -------Funcion para Buscar datos de una oferta de trabajo
const getOffers = async (req, res) => {
    try{
        console.log(req.params.id);
        if(req.params.id){
            let dataSearch = await Offer.findById(req.params.id);
            console.log(dataSearch);
            res.status(200).json(dataSearch) // devuelve una oferta por id
        } else {
            let dataSearch = await Offer.find({});
            res.status(200).json({offers: dataSearch}) // Devuelve todos las ofertas
        }
    } 
    catch(err){
        res.status(400).json({"error":err})
    } 
} 

// MONGOSB -------Funcion para Editar datos de una oferta de trabajo 
const updateOffert = async (req, res) => {
    try {
        let editOffer = await Offer.findById(req.body.id);
        editOffer.description = req.body.newDescription;
        let result = editOffer.save();
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json({"error":err});
    }; 
};

//MondoDB ---------- Funcion Borrar oferta de trabajo
const deleteOffert = async (req, res) => {
    try {
        let editOffer = await Offer.findById(req.body.id); //primero busca la oferta
        let result = editOffer.remove();  // luego borra la oferta
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json({"error":err})
    } 
}
 
const trabajo ={
    home,
    register,
    login,
    logout,
    createOffer,
    getOffers,
    updateOffert,
    deleteOffert
}

module.exports = trabajo;
    
