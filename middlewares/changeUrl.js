const changeUrl = url => {
    return (req,res,next) => {
        req.url = `/${url}`
        next();
    };
};

module.exports = changeUrl;