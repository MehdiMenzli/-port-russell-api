const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/port-russell");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Erreur MongoDB"));

db.once("open", function () {
    console.log("Connexion MongoDB réussie");
});

module.exports = db;