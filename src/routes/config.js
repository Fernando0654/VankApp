const router = require("express").Router();
const { isAuth } = require("../helpers/guard");
const User = require("../models/User");
const Contact = require("../models/Contacts");

router.get("/configuracion", isAuth, async (req, res) => {
  const usuario = await User.findOne({ email: req.user.email });
  const contactos = await Contact.find({ belongTo: req.user.email }).lean();
  const { email, name, age, phone, saldo } = usuario;
  res.render("actions/config", {
    email,
    name,
    age,
    phone,
    saldo,
    contactos,
  });
});

router.get("/agregar/:email", isAuth, async (req, res) => {
  const emailExist = await User.findOne({ email: req.params.email });
  if (!emailExist) {
    req.flash("error_msg", "Este usuario no existe :(");
    res.redirect("/configuracion");
    return;
  } else {
    const belongTo = req.user.email;
    const emailContact = emailExist.email;
    const nameContact = emailExist.name;
    const newContact = new Contact({
      belongTo,
      emailContact,
      nameContact,
    });
    await newContact.save();
    req.flash("success_msg", "Contacto agregado");
    res.redirect("/configuracion");
  }
});

router.delete("/contacto/borrar/:id", isAuth, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Contacto borrado");
  res.redirect('/configuracion');
});

module.exports = router;
