//Importar postgresql
// const { Pool } = require("pg");
// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
// });

const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "intermedio_users",
    password: "1234",
});

//funcion para crear favoritos//
const createFavorite = async favoriteInfo => {
    const {
        title,
        companyName,
        description,
        salary,
        location,
        url,
        userEmail,
    } = favoriteInfo;
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(
            `INSERT INTO favorites(favorite_title, favorite_companyName, favorite_description, favorite_salary, favorite_location, favorite_url, user_id) 
            VALUES ($1,$2,$3,$4,$5,$6,(SELECT user_id FROM users WHERE user_email = $7));`,
            [title, companyName, description, salary, location, url, userEmail]
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

// funcion para obtener los favoritos de un usuario //
const getAllFavoritesByUser = async userEmail => {
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(
            `
            SELECT f.favorite_title, f.favorite_companyName, f.favorite_description, f.favorite_salary, f.favorite_location, f.favorite_url
            FROM users AS u
            INNER JOIN favorites AS f
            ON u.user_id = f.user_id
            WHERE u.user_email = $1;
        `,
            [userEmail]
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

// borrar favoritos de un usuario//
const deleteFavorite = async favoriteId => {
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion

        const data = await user.query(
            `DELETE FROM public.favorites WHERE favorite_id = $1;`,
            [favoriteId]
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

// pruebas
// getAllFavoritesByUser("isaguapo@gmail.com").then(data => console.log(data)); //FUNCIONA

// const newFavorite = {
//     title: 'Tester junior',
//     companyName: 'Telefonica',
//     description: 'Tester junior sin experiencia previa, se valaran en jest',
//     salary: 20000,
//     location: 'Calle Madrid, 06, Madrid',
//     url: 'https://www.infojobs.net/zamudio/ingeniero-gestion-energia/of-i30dd55754a43229b590d5d62518118?applicationOrigin=search-new%7Celement%7E42960137838%7Cversion%7ECONTROL&searchId=42960137838&page=1&sortBy=PUBLICATION_DATE',
//     userEmail: 'michelle@gmail.com'
// }
// createFavorite(newFavorite)
// .then(data=>console.log(data)) //FUNCIONA

// deleteFavorite(2).then(data => console.log(data)); //FUNCIONA

const favorites = {
    createFavorite,
    getAllFavoritesByUser,
    deleteFavorite,
};

module.exports = favorites;
