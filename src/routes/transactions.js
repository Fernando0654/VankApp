const router = require("express").Router();
const { isAuth } = require("../helpers/guard");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

router.get("/transacciones", isAuth, async (req, res) => {
  const saldo = req.user.saldo;
  res.render("actions/makeTransaction", { saldo });
});

router.post("/adding", isAuth, async (req, res) => {
  const { correo, concepto, cantidad } = req.body;
  const errors = [];
  const emailExist = await User.findOne({ email: correo });
  if (!emailExist) {
    errors.push({ text: "Este usuario no existe" });
  }
  if (!correo) {
    errors.push({ text: "Por favor, introduce un correo" });
  }
  if (!concepto) {
    errors.push({ text: "Por favor, introduce un concepto" });
  }
  if (!cantidad) {
    errors.push({ text: "Por favor, introduce una cantidad" });
  }
  if (errors.length > 0) {
    res.render("actions/makeTransaction", {
      errors,
      correo,
      concepto,
      cantidad,
    });
  } else {
    let nuevoSaldo = req.user.saldo - cantidad;
    console.log(nuevoSaldo);
    const newTransaction = new Transaction({
      correo,
      concepto,
      cantidad,
    });
    const filter = { email: req.user.email };
    const update = { saldo: nuevoSaldo };

    // `doc` is the document _before_ `update` was applied
    let doc = await User.findOneAndUpdate(filter, update);
    newTransaction.user = req.user.id;
    await newTransaction.save();
    req.flash("success_msg", "Transacción realizada con éxito");
    res.redirect("/panel");
  }
});

module.exports = router;
