const passport = require("passport");
const localStrat = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new localStrat(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        // null porque no hay error, false para el user y mensaje
        return done(null, false, { message: "Este usuario no existe" });
      } else {
        const matchPassword = await user.matchPassword(password);
        if (matchPassword) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
      }
    }
  )
);

// Almacenar sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Cerrar sesión

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
