const getRoleByToken = require('../utils/getRoleByToken')

const error404 = (req,res,next) => {
    const role = getRoleByToken(req.cookies.access_token);

    const data = {
      title: "Error! 404",
      message: "La Pagina no a sido encontrada, vuelva a intentarlo",
      url: "https://www.lancetalent.com/blog/wp-content/uploads/paginas_erro_404.png"
    };
    res.status(404).render('error',{error: data, role: role});
};

const errors = {
    error404
};

module.exports = errors;