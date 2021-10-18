const helpers = {};

helpers.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Sin autorizacion');
    res.redirect('/');
};

module.exports = helpers;