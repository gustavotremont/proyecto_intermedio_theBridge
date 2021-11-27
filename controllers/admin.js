const dataUser = require("../models/users");
const dataFavorite = require("../models/favorites");

const getUser = async (req, res) => {
    if (req.params.email) {
        const data = await dataUser.getUser(req.params.email);
        res.status(200).json(data);
    } else {
        const data = await dataUser.getAllUsers();
        res.status(200).json({ users: data });
    }
};

const createUser = async (req, res) => {
    const result = await dataUser.createUser(req.body);
    console.log(result);
    res.status(201).send("nuevo usuario creado");
};

const deleteUser = async (req, res) => {
    const result = await dataUser.deleteUser(req.body.email, req.body.password);
    console.log(result);
    res.status(200).send("usuario borrado exitosamente");
};

const updateUser = async (req, res) => {
    const result = await dataUser.updateUser(
        req.body.email,
        req.body.password,
        req.body.newPassword
    );
    console.log(result);
    res.status(200).send("La clave del ususario a sido cambiada");
};

const users = {
    getUser,
    createUser,
    deleteUser,
    updateUser,
};

module.exports = users;