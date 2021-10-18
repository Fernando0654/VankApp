const passport = require('passport');
const router = require('express').Router();
const { isAuth } = require('../helpers/guard');

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/panel', isAuth, (req, res) => {
    res.render('panel')
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/panel',
    failureRedirect: '/',
    failureFlash: true
}))

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;