const error404 = (req,res,next) => {
    const data = {
      message:"Error! 404 not found",
      url:"https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg",
      status: 404
    };
    res.status(404).render('error',data);
};

const errors = {
    error404
};

module.exports = errors;