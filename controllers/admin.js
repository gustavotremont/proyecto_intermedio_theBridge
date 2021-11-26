const User = require('../models/users')



const getUser = async(req,res) =>{
    const user = await User.getAllUsers()
    res.status(200).json({users:user})

}


const users = {
    getUser
}

module.exports = users