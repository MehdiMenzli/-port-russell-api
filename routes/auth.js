const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        req.session.user = user;

        res.redirect("/dashboard");

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});


// LOGOUT
router.get("/logout", (req, res) => {

    req.session.destroy();

    res.send("Déconnexion réussie");

});

module.exports = router;