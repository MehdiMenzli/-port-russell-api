const express = require("express");
const router = express.Router();

const Reservation = require("../models/Reservation");


// Voir toutes les réservations d'un catway
router.get("/catways/:id/reservations", async (req, res) => {

    try {

        const reservations = await Reservation.find({
            catwayNumber: req.params.id
        });

        res.json(reservations);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});


// Voir une réservation précise
router.get("/catways/:id/reservations/:idReservation", async (req, res) => {

    try {

        const reservation = await Reservation.findById(req.params.idReservation);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation non trouvée" });
        }

        res.json(reservation);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});


// Créer une réservation
router.post("/catways/:id/reservations", async (req, res) => {

    try {

        const newReservation = new Reservation({

            catwayNumber: req.params.id,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate

        });

        const savedReservation = await newReservation.save();

        res.status(201).json(savedReservation);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});


// Modifier une réservation
router.put("/catways/:id/reservations/:idReservation", async (req, res) => {

    try {

        const reservation = await Reservation.findById(req.params.idReservation);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation non trouvée" });
        }

        reservation.clientName = req.body.clientName;
        reservation.boatName = req.body.boatName;
        reservation.startDate = req.body.startDate;
        reservation.endDate = req.body.endDate;

        await reservation.save();

        res.json(reservation);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});


// Supprimer une réservation
router.delete("/catways/:id/reservations/:idReservation", async (req, res) => {

    try {

        const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation non trouvée" });
        }

        res.json({ message: "Reservation supprimée" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});

module.exports = router;