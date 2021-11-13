const { isAuth } = require("../helpers/guard");
const Transaction = require("../models/Transaction");
const router = require("express").Router();
let firstTime = true;

router.get("/movimientos", isAuth, async (req, res) => {
  let movimientos;
  if (firstTime) {
    movimientos = await Transaction.find({ user: req.user.id })
      .lean()
      .sort({ _id: -1 });
  }
  firtTime = false;
  let saldo = req.user.saldo;
  res.render("actions/seeMovements", { movimientos, saldo });
});

router.post("/movimientos/", async (req, res) => {
  const { filtro } = req.body;
  let movimientos;
  switch (filtro) {
    case "recientes":
      movimientos = await Transaction.find({ user: req.user.id })
        .lean()
        .sort({ _id: -1 });
      break;
    case "antiguos":
      movimientos = await Transaction.find({ user: req.user.id })
        .lean()
        .sort({ _id: 1 });
      break;
    case "cantidadAlta":
      movimientos = await Transaction.find({ user: req.user.id })
        .lean()
        .sort({ cantidad: -1 });
      break;
    case "cantidadBaja":
      movimientos = await Transaction.find({ user: req.user.id })
        .lean()
        .sort({ cantidad: 1 });
      break;
    default:
      res.send("ERROR, Something went so wrong...");
      break;
  }
  let saldo = req.user.saldo;
  res.render("actions/seeMovements", { movimientos, saldo });
});

router.get("/movimiento/:id", isAuth, async (req, res) => {
  const movimiento = await Transaction.find({ _id: req.params.id }).lean();
  const { correo, concepto, cantidad, fecha, tipo } = Object.entries(movimiento)[0][1];
  const msg = `
  Correo: ${correo}
  Concepto: ${concepto}
  Cantidad: ${cantidad} $
  Fecha: ${fecha}
  Tipo: ${tipo}
  `;
  req.flash("info_msg", `${msg}`);
  res.redirect("/movimientos");
});

router.delete("/movimiento/delete/:id", isAuth, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Elemento borrado");
  res.redirect("/movimientos");
});

module.exports = router;
