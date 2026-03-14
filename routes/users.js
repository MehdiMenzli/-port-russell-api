const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");


// voir tous les utilisateurs
router.get("/users", async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});


// voir un utilisateur
router.get("/users/:email", async (req, res) => {

    try {

        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json(user);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});


// créer utilisateur
router.post("/users", async (req, res) => {

    try {

        // 🔐 cryptage du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({

            name: req.body.name,
            email: req.body.email,
            password: hashedPassword

        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});


// modifier utilisateur
router.put("/users/:email", async (req, res) => {

    try {

        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        user.name = req.body.name;

        // 🔐 recrypte le mot de passe si modifié
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        await user.save();

        res.json(user);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});


// supprimer utilisateur
router.delete("/users/:email", async (req, res) => {

    try {

        const user = await User.findOneAndDelete({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json({ message: "Utilisateur supprimé" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});

module.exports = router;