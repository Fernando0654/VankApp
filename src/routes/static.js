const router = require("express").Router();

router.get('/help', (req, res) => {
    res.render("help");
});

router.get('/about', (req, res) => {
    res.render("about");
});

router.get('/docs', (req, res) => {
    res.render("docs");
});

module.exports = router;