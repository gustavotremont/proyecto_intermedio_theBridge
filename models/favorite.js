const pool = require('../utils/dbPostgres')

//funcion para crear favoritos//
const createFavorite = async (favoriteInfo) => {
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

const getFavorite = async (favoriteId) => {
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(
            `
            SELECT * FROM favorites
            WHERE favorite_id = $1;
        `,
            [favoriteId]
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

// funcion para obtener los favoritos de un usuario //
const getAllFavoritesByUser = async (userEmail) => {
    let user, result;
    try {
        user = await pool.connect(); // Espera a abrir conexion
        const data = await user.query(
            `
            SELECT f.favorite_id, f.favorite_title, f.favorite_companyName, f.favorite_description, f.favorite_salary, f.favorite_location, f.favorite_url
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

/////////////////////////////////// PRUEBAS //////////////////////////////////
// getAllFavoritesByUser("isaguapo@gmail.com").then(data => console.log(data)); //FUNCIONA

// const newFavorite = {
//     title: 'Desarollador/a Python',
//     companyName: 'NTT DATA ofertas de empleo profesionales',
//     description: 'NTT Data somos todas las personas que la formamos. Un equipo de más de 139.000 profesionales, tan diverso como diversos son los 50 países en los que estamos presentes y los diferentes sectores en los que desarrollamos nuestra actividad.',
//     salary: 20000,
//     location: 'León, León (España)',
//     url: 'https://www.infojobs.net/leon/desarollador-python/of-ic419e4957243bd89d5091b76249001?applicationOrigin=search-new%7Celement%7E43044089216%7Cversion%7ECONTROL&searchId=43044089216&page=1&sortBy=RELEVANCE',
//     userEmail: 'gollo@mail.com'
// }
// createFavorite(newFavorite)
// .then(data=>console.log(data)) //FUNCIONA

// deleteFavorite(2).then(data => console.log(data)); //FUNCIONA

const Favorite = {
    createFavorite,
    getAllFavoritesByUser,
    deleteFavorite,
};

module.exports = Favorite;
