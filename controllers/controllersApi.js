//Funcion que pinta nuestros datos en home
const home = (req,res) =>{
    res.json()
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

const controllerApi ={
    home,
    login,
    logout,
}

module.exports = controllerApi;
    
