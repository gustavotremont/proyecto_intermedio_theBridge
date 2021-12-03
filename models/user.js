const pool = require('../utils/dbPostgres')
const bcrypt = require('../utils/cryptPassword')

//funcion para crear usuarios//
const createUser = async (userInfo) => {
    const { name, email, password, age, tlf, dni } = userInfo;
    const cryptPassword = await bcrypt.hashPassword(password);
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(
            `INSERT INTO users(user_name, user_email, user_password, user_age, user_tlf, user_dni, user_type) 
                                    VALUES ($1,$2,$3,$4,$5,$6,$7);`,
            [name, email, cryptPassword, age, tlf, dni, 2]
        );
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        user.release();
    }
    return result;
};

// funcion para obtener todos los usuarios //
const getAllUsers = async () => {
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(`SELECT * FROM users;`);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        user.release();
    }
    return result;
};

// funcion de obtener un usuario //

const getUser = async (email) => {
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(
            `SELECT * FROM users WHERE user_email=$1;`,
            [email]
        );
        result = data.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        user.release();
    }
    return result;
};

// const authUser = async (email, password) => {
//     let user, result;
//     try {
//         user = await pool.connect(); // Espera a abrir conexion
//         const data = await user.query(
//             `SELECT * FROM users WHERE user_email=$1 AND user_password=$2;`,
//             [email, password]
//         );
//         result = data.rowCount;
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         user.release();
//     }
//     return result;
// };

//

const deleteUser = async (email, password) => {
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion

        const data = await user.query(
            `DELETE FROM public.users WHERE user_email = $1 AND user_password = $2;`,
            [email, password]
        );

        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        user.release();
    }
    return result;
};


const updateUser = async (email, password, newPassword) => {
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion

        const data = await user.query(
            `UPDATE public.users
            SET user_password=$3
            WHERE user_email = $1 AND user_password = $2;`,
            [email, password, newPassword]
        );

        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        user.release();
    }
    return result;
};

//pruebas
// getAllUsers().then(data => console.log(data)); //FUNCIONA
// getUser('gustavotremontsr@gmail.com').then(data => console.log(data)) //FUNCIONA

// const newUser = {
//     name: "Gustavo Tremont",
//     email: "gustavotremontsr@gmail.com",
//     password: "pokemon2000",
//     age: 24,
//     tlf: "659513187",
//     dni:"09853571A"

// }
// createUser(newUser)
// .then(data=>console.log(data)) //FUNCIONA

// deleteUser("gus@school.com", "12345").then(data => console.log(data)); //FUNCIONA
// updateUser('isaguapo@gmail.com','987654321','soylanuevacontraseña').then(data => console.log(data)); //FUNCIONA

const User = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};

module.exports = User;