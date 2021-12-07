const jwt = require('jsonwebtoken'); //import jwt from 'jsonwebtoken'; 

const getEmailByToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data.email
};

module.exports = getEmailByToken