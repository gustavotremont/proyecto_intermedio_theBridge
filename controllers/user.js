const User = require("../models/user");

const createUser = async (req, res) => {
    try {
        const result = await User.createUser(req.body);
        res.status(201).send("nuevo usuario creado");        
    } catch (err) {
        res.status(400).json({"error":err})
    }    
};

const getUser = async (req, res) => {
    try {
        if (req.params.email) {
            const result = await User.getUser(req.params.email);
            res.status(200).render('profile',{profile:result});
        } else {
            const result = await User.getAllUsers();
            res.status(200).render('users',{result:result});
        }        
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const deleteUser = async (req, res) => {
    try {        
        const result = await User.deleteUser(req.body.email, req.body.password);
        res.status(200).send("usuario borrado exitosamente");
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const updateUser = async (req, res) => {
    try {        
        const result = await User.updateUser(
            req.body.email,
            req.body.password,
            req.body.newPassword
        );
        res.status(200).send("La clave del ususario ha sido cambiada");
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const users = {
    createUser,
    getUser,
    deleteUser,
    updateUser,
};

module.exports = users;