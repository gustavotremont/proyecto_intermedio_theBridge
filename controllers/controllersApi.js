
const User = require('../models/users')
//Funcion que pinta nuestros datos en home
const home = (req,res) =>{
    res.json()
}

// funcion para registrarse en la api
const register = async ( req, res) => {
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


//funcion para crear oferta
const createOfert =  (req,res) => {
    const dataOfert = {
        "Puesto": "Programador", //aqui tiene que ir la llamada a los datos del pug req.body.title por ej
        "Nombre_empresa": " CES",
        "Localizacion": "Madrid",
        "Requisitos": "Css / javascript",
        "Descripcion": "L a V 9 A 15h pm",
        "Mensaje": `Se ha guardado la oferta correctamente`,
    }
    return res.status(201).json(dataOfert) //devuelven los datos del json
}

//funcion favoritos
const favorites = (req, res) => {
    const dataFavorites = {
        
    }
    return res.status(201).json(dataFavorites)
}


//funcion para editar perfil de usuario
 const editUser = (req, res) => {
    const dataEditUser = {
        "email": "mm@gmail.com",
        "password": "123456"   
    }
    return res.status(201).json(dataEditUser)
} 

// Funcion para Editar datos de una oferta de trabajo 
const editOfert = (req, res) => {
    const dataEditOfert = {
        "Puesto": "Developer",
        "Nombre_empresa": " CES",
        "Localizacion": "Madrid",
        "Requisitos": " javascript",
        "Descripcion": "L a V 9 A 15h pm",
        
    }
    return res.status(201).json(dataEditOfert)
}

// Funcion para Borrar a un usuario de la base de datos(admin)
const deleteUser = (req, res) => { //?? en el ejericcio piden /api/user/ads ??
    const dataUser = {
        "email": "mm@gmail.com",
        "password": "123456",
        "Nombre":"Maria",
        "Apellidos":"Garcia",
        "cv":"curriculum"
        
    }
    return res.status(201).json(dataUser)
}

//Funcion Borrar oferta de trabajo
const deleteOfert = (req, res) => {
    const dataDeleteOfert = {
        "Puesto": "Developer",
        "Nombre_empresa": " CES",
        "Localizacion": "Madrid",
        "Requisitos": " javascript",
        "Descripcion": "L a V 9 A 15h pm",
        
    }
    return res.status(201).json(dataDeleteOfert)
}

//Funcion Borrar favoritos
const deleteFavorites = (req, res) => {
   const dataDeleteavorites = {
        
    }
    return res.status(201).json(dataDeleteavorites)
}

// Funcion para Listado de resultados de la busqueda
const listSearch = (req, res) => {
    const dataSearch = {
        "Puesto": "Developer",
        "Requisitos": " javascript",
        "Descripcion": "L a V 9 A 15h pm",
        
    }
    return res.status(201).json(dataSearch)
}


const trabajo ={
    home,
    register,
    login,
    createOfert,
    logout,
    favorites,
    editUser,
    editOfert,
    deleteUser,
    deleteOfert,
    deleteFavorites,
    listSearch
    
}

module.exports = trabajo;