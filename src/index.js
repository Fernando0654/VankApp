const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOver = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

// Inicialización
const app = express();
require("./db");
require("./config/passport");

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

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon1.ico'));

// Variables globales ########################3

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  res.locals.saldo = req.saldo;
  next();
});

// Rutas

app.use(require("./routes/index"));
app.use(require("./routes/transactions"));
app.use(require("./routes/movements"));
app.use(require("./routes/users"));
app.use(require("./routes/contactos"));
app.use(require("./routes/config"));
app.use(require("./routes/static"));

// Archivos estáticos

app.use(express.static(path.join(__dirname, "public")));

// Iniciar servidor

app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});

app.use(function(req, res, next){
  res.status(404).render('404', {title: "Sorry, page not found"});
});
