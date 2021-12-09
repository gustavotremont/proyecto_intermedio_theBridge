const jwt = require('jsonwebtoken'); //import jwt from 'jsonwebtoken'; 

const getRoleByToken = (token) => {
    let role = '':
    if (token) {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        return data.role;
    }
    return role;
};

module.exports = getRoleByToken;