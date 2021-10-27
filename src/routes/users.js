const router = require("express").Router();
const User = require("../models/User");
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const {
    email,
    name,
    password,
    password_repeated,
    age,
    phone,
    numero,
    expira,
    address,
    cvv,
    tipo,
  } = req.body;
  const errors = [];
  if (
    email == "" ||
    name == "" ||
    password == "" ||
    age == "" ||
    phone == "" ||
    numero == "" ||
    expira == "" ||
    address == "" ||
    cvv == "" ||
    tipo == ""
  ) {
    errors.push({ text: "Rellena todos los campos, por favor" });
  }
  if (password != password_repeated) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length <= 5) {
    errors.push({ text: "La contraseña debe ser mayor a 5 caracteres" });
  }
  if(numero < 16) {
    errors.push({text: "Esta tarjeta es inválida"})
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      email,
      name,
      password,
      password_repeated,
      age,
      phone,
      numero,
      expira,
      address,
      cvv,
      tipo,
    });
  } else {
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      req.flash("error_msg", "Este correo ya fue registrado");
      res.redirect("/");
    }
    let saldo = 20000;
    const newUser = new User({
      email,
      name,
      password,
      age,
      phone,
      saldo,
      numero,
      expira,
      address,
      cvv,
      tipo,
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "Registro exitoso. Bienvenido ");
    res.redirect("/");
  }
});

module.exports = router;
