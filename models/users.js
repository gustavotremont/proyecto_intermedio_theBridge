//Importar postgresql
const { Pool } = require("pg");
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
});

// const { Pool } = require("pg");
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "intermedio_users",
//     password: "1234",
// });

//funcion para crear usuarios//
const createUser = async userInfo => {
    const { name, email, password, age, tlf, dni } = userInfo;
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(
            `INSERT INTO users(user_name, user_email, user_password, user_age, user_tlf, user_dni, user_type) 
                                    VALUES ($1,$2,$3,$4,$5,$6,$7);`,
            [name, email, password, age, tlf, dni, 2]
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

const getUser = async email => {
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(
            `SELECT * FROM users WHERE user_email=$1;`,
            [email]
        );
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        user.release();
    }
    return result;
};

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

// UPDATE public.users
// 	SET user_id=?, user_name=?, user_email=?, user_password=?, user_age=?, user_tlf=?, user_dni=?, user_type=?
// 	WHERE <condition>;

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
// getUser('michelle@gmail.com').then(data => console.log(data)) //FUNCIONA

// const newUser = {
//     name: "Isa",
//     email: "isaguapo@gmail.com",
//     password: "987654321",
//     age: 31,
//     tlf: "123456789",
//     dni:"90853512A"

// }
// createUser(newUser)
// .then(data=>console.log(data)) //FUNCIONA

// deleteUser("gus@school.com", "12345").then(data => console.log(data)); //FUNCIONA
// updateUser('isaguapo@gmail.com','987654321','soylanuevacontraseña').then(data => console.log(data)); //FUNCIONA

const users = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
};

module.exports = users;