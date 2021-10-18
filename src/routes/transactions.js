const router = require("express").Router();
const Transaction = require('../models/Transaction');

router.get("/transacciones", (req, res) => {
  res.render("actions/makeTransaction");
});

router.post("/adding", async (req, res) => {
  const { correo, concepto, cantidad } = req.body;
  const errors = [];
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
    const newTransaction = new Transaction({
        correo,
        concepto,
        cantidad
    });
    await newTransaction.save();
    req.flash('success_msg', 'Transacción realizada con éxito');
    res.redirect("/panel")
  }
});

module.exports = router;
