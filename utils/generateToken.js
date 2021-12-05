const jwt = require('jsonwebtoken'); //import jwt from 'jsonwebtoken'; 

const generateToken = (res, body) => {
  const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return res.cookie('token', token, {
    expires: new Date(Date.now() + 18000000),
    secure: false, // set to true if your using https
    httpOnly: true,
  });
  
};
module.exports = generateToken