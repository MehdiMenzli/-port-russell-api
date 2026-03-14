const express = require("express");
const router = express.Router();

const Catway = require("../models/Catway");

// GET /catways
router.get("/", async (req, res) => {
    try {
        const catways = await Catway.find();
        res.json(catways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;




// GET /catways/:id
router.get("/:id", async (req, res) => {
    try {

        const catway = await Catway.findOne({ catwayNumber: req.params.id });

        if (!catway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }

        res.json(catway);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// POST /catways
router.post("/", async (req, res) => {

    try {

        const newCatway = new Catway({
            catwayNumber: req.body.catwayNumber,
            catwayType: req.body.catwayType,
            catwayState: req.body.catwayState
        });

        const savedCatway = await newCatway.save();

        res.status(201).json(savedCatway);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});




// PUT /catways/:id
router.put("/:id", async (req, res) => {

    try {

        const catway = await Catway.findOne({ catwayNumber: req.params.id });

        if (!catway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }

        catway.catwayState = req.body.catwayState;

        await catway.save();

        res.json(catway);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});





// DELETE /catways/:id
router.delete("/:id", async (req, res) => {

    try {

        const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });

        if (!catway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }

        res.json({ message: "Catway supprimé" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});