const router = require("express").Router();
const { isAuth } = require("../helpers/guard");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Contact = require("../models/Contacts");

router.get("/transacciones", isAuth, async (req, res) => {
  const saldo = req.user.saldo;
  const contactos = await Contact.find({ belongTo: req.user.email }).lean();
  res.render("actions/makeTransaction", { saldo, contactos });
});

router.post("/adding", isAuth, async (req, res) => {
  let { correo, concepto, cantidad } = req.body;
  const saldo = req.user.saldo;
  const errors = [];
  const emailExist = await User.findOne({ email: correo });
  if (!correo) {
    errors.push({ text: "Por favor, introduce un correo" });
  } else {
    if (!emailExist) {
      errors.push({ text: "Este usuario no existe" });
    } else {
      if (emailExist.email === req.user.email) {
        errors.push({
          text: "No puedes depositarte a ti mismo, no seas tramposo",
        });
      }
    }
  }
  if (!concepto) {
    errors.push({ text: "Por favor, introduce un concepto" });
  }
  if (!cantidad) {
    errors.push({ text: "Por favor, introduce una cantidad" });
  }
  if (errors.length > 0) {
    const contactos = await Contact.find({ belongTo: req.user.email }).lean();
    res.render("actions/makeTransaction", {
      errors,
      correo,
      concepto,
      cantidad,
      saldo,
      contactos,
    });
  } else {
    let fecha = new Date();
    fecha = fecha.toLocaleString();
    let saldoRemitente = req.user.saldo - cantidad;
    let saldoDestinatario = parseInt(emailExist.saldo) + parseInt(cantidad);
    let filtroDestino = { email: emailExist.email };
    let actualizaDestino = { saldo: saldoDestinatario };
    const filtroRemitente = { email: req.user.email };
    const actualizaRemitente = { saldo: saldoRemitente };
    const transaccionRemitente = new Transaction({
      correo,
      concepto,
      cantidad,
      tipo: "Enviado",
      fecha,
    });
    correo = req.user.email;
    const transaccionDestino = new Transaction({
      correo,
      concepto,
      cantidad,
      tipo: "Recibido",
      fecha,
    });
    // `doc` is the document _before_ `update` was applied
    await User.findOneAndUpdate(filtroDestino, actualizaDestino); // Saldo del remitente
    await User.findOneAndUpdate(filtroRemitente, actualizaRemitente); // Saldo del destinatario
    transaccionRemitente.user = req.user.id;
    transaccionDestino.user = emailExist._id;
    await transaccionRemitente.save();
    await transaccionDestino.save();
    req.flash("success_msg", "Transacción realizada con éxito");
    res.redirect("/panel");
  }
});

module.exports = router;
