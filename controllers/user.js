const dataUser = require("../models/users");

const getUserByEmail = async (req, res) => {
    const data = await dataUser.getUser(req.params.email);
    res.status(200).json(data);
};

const users = {
    getUserByEmail
};

module.exports = users;