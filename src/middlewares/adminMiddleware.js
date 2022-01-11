﻿function adminMiddleware(req, res, next) {
    if (!req.session.userLogin) {
        return res.redirect('/');
    }
    if (req.session.userLogin && req.session.userLogin.rol !== 2 ) {
        return res.redirect('/');
    }
    next();
}

module.exports = adminMiddleware;