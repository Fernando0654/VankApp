const router = require("express").Router();
const { isAuth } = require("../helpers/guard");
const User = require("../models/User");

router.get("/configuracion", isAuth, async (req, res) => {
  const usuario = await User.findOne({ email: req.user.email });
  const { email, name, age, phone, saldo, numero, expira, address, cvv, tipo } = usuario;
  res.render("actions/config", {
    email,
    name,
    age,
    phone,
    saldo,
    numero,
    expira,
    address,
    cvv,
    tipo
  });
});

module.exports = router;
