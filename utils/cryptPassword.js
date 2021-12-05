const bcryptModule = require('bcrypt');

const hashPassword = async password => {
    if (!password) {
      throw new Error('Password was not provided')
    }
  
    const salt = await bcryptModule.genSalt(10)
    return await bcryptModule.hash(password, salt)
}
  
const verifyPassword = async (candidate, actual) => {
    return await bcryptModule.compare(candidate, actual)
}

const bcrypt = {
    hashPassword,
    verifyPassword
}

module.exports = bcrypt