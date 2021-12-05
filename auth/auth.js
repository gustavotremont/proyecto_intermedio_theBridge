const jwt = require('jsonwebtoken');

const isValidToken = (token) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      // error
      return false;
    }
};

const auth = {
    isValidToken
  };
  
module.exports = auth;