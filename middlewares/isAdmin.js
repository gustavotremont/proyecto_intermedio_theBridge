const getRoleByToken = require('../utils/getRoleByToken')

const isAdmin = (req,res,next) => {
    if (req.cookies.access_token) {
        const role = getRoleByToken(req.cookies.access_token)

        if (role === 1) {
            next()
        }else{
            const data = {
                title: "Acceso denegado",
                message: "Lo sentimos, no tiene acceso a esta pagina",
                url: "https://www.lucushost.com/blog/wp-content/uploads/2020/06/error-403-forbbiden.png"
            };
            res.status(404).render('error',{error: data, role: role});
        }
    }else{
        res.status(403).redirect('/')
    }
};

module.exports = isAdmin;