const passport = require("passport");
const router = require("express").Router();
const { isAuth } = require("../helpers/guard");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/panel", isAuth, (req, res) => {
  let nombre = req.user.name;
  nombre = nombre.split(" ");
  nombre = nombre[0];
  res.render("panel", { nombre });
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/panel",
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Hasta luego. Vuelve pronto");
  res.redirect("/");
});

module.exports = router;
