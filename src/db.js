const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://fernando:FeNoSV0654@cluster0.cjn98.mongodb.net/vank-app-db?retryWrites=true&w=majority")
  .then(() => console.log("Base de datos conectada."))
  .catch((err) => {
    console.error(err);
  });
