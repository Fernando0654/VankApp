const router = require("express").Router();
const { isAuth } = require("../helpers/guard");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

router.get("/configuracion", isAuth, async (req, res) => {
  const usuario = await User.findOne({ email: req.user.email });
  const {
    _id,
    email,
    name,
    age,
    phone,
    saldo,
    numero,
    expira,
    address,
    cvv,
    tipo,
  } = usuario;
  res.render("actions/config", {
    _id,
    email,
    name,
    age,
    phone,
    saldo,
    numero,
    expira,
    address,
    tipo,
  });
});

router.get("/configuracion/editar/:id", isAuth, async (req, res) => {
  const usuario = await User.findOne({ email: req.user.email });
  const {
    _id,
    email,
    name,
    age,
    phone,
    password,
    saldo
  } = usuario;
  res.render("actions/config-edit", {
    _id,
    email,
    name,
    age,
    phone,
    password,
    saldo,
  });
});

router.put("/configuracion/editar/:id", isAuth, async (req, res) => {
  const { email, name, password, age, phone, } =
    req.body;
  console.log(req.params.id);
  await User.findByIdAndUpdate(req.params.id, {
    email,
    name,
    password,
    age,
    phone,
  });
  req.flash('success_msg', "Datos actualizados con éxito");
  res.redirect("/configuracion");
});

router.get("/verify/:password?", isAuth, async (req, res) =>{
  if(!req.params.password) {
    res.redirect(`/configuracion/editar/${req.user._id}`);
  } else {
    const passwordEntered = req.params.password;
    const matchPassword = await bcrypt.compare(passwordEntered, req.user.password);
    if(matchPassword) {
      res.redirect(`/configuracion/editar/${req.user._id}?p=t`);
    } else {
      res.redirect(`/configuracion/editar/${req.user._id}?p=f`);
    }
  }
});

router.get("/changePassword/:newPassword", isAuth, async(req, res) => {
  const pass = req.params.newPassword;
  const encrypted = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(pass, encrypted);
  await User.findByIdAndUpdate(req.user._id, {
    password: newPassword
  });
  res.redirect('/logout');
})

module.exports = router;
