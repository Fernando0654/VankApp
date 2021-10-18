const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOver = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

// Inicialización
const app = express();
require("./db");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");
// Middlewares #########################

app.use(
  express.urlencoded({
    extended: false, // no acepto imagenes ni otros datos
  })
);

app.use(methodOver("_method")); // sirve para usar PUT y DELETE methods

app.use(
  session({
    secret: "vankapp",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

// Variables globales ########################3

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})

// Rutas

app.use(require("./routes/index"));
app.use(require("./routes/transactions"));
app.use(require("./routes/movements"));
app.use(require("./routes/users"));

// Archivos estáticos

app.use(express.static(path.join(__dirname, "public")));

// Iniciar servidor

app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});
