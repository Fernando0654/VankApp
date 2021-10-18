const Transaction = require("../models/Transaction");
const router = require("express").Router();

router.get("/movimientos", async (req, res) => {
  const movimientos = await Transaction.find().lean().sort({ fecha: "desc" });
  res.render("actions/seeMovements", { movimientos });
});

router.get("/movimiento/:id", async (req, res) => {
  const movimiento = await Transaction.findById(req.params.id);
  res.render("actions/seeMovement", { movimiento });
});

router.delete("/movimiento/delete/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Elemento borrado');
  res.redirect("/movimientos");
});

module.exports = router;
