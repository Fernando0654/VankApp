const router = require("express").Router();
const User = require('../models/User')

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { email, name, password, password_repeated, age, phone } = req.body;
  const errors = [];
  if (password != password_repeated) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length <= 5) {
    errors.push({ text: "La contraseña debe ser mayor a 5 caracteres" });
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
    });
  } else {
      const existEmail = User.findOne({email: email});
      if( existEmail ) {
          req.flash('Este correo ya fue registrado');
          res.redirect('/')
      }
      const newUser = new User({email, name, password, age, phone});
      newUser.password = newUser.encryptPassword(password);
      await newUser.save();
      req.flash('Registro exitoso. Bienvenido, ');
      res.redirect('/');
  }
});

module.exports = router;
