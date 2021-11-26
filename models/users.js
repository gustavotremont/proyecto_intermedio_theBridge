

const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})



//funcion para crear usuarios//


const createUser = async (userInfo) => {
    const {name, email, password, age, tlf, dni} = userInfo;
    let user,result;
    try{
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(`INSERT INTO users(user_name, user_email, user_password, user_age, user_tlf, user_dni, user_type) 
                                    VALUES ($1,$2,$3,$4,$5,$6,$7);`
                                    ,[name, email, password, age, tlf, dni, 2])

        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        user.release();    
    }
    return result
}


// funcion para obtener todos los usuarios //
const getAllUsers = async () => {
    let user,result;
    try{
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(`SELECT * FROM users;`)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        user.release();    
    }
    return result
}


// funcion de obtener un usuario //

const getUser = async (email) => {
    let user,result;
    try{
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(`SELECT * FROM users WHERE user_email=$1;`,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        user.release();    
    }
    return result
}












//pruebas
getAllUsers()
 .then(data=>console.log(data))

// getUser("gus@gmail.com")
// .then(data=>console.log(data))
// users(user_name, user_email, user_password, user_age, user_tlf, user_dni, user_type
// const newUser = {
//     name: "Michelle",
//     email: "michelle@gmail.com",
//     password: "12345",
//     age: 31,
//     tlf: "645602669",
//     dni:"y4867914r"

// }
// createUser(newUser)
// .then(data=>console.log(data))






const users = {
    createUser,
    getAllUsers,
    getUser

}

module.exports = users