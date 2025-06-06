const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

router
    .route("/trips")
    .get(tripsController.tripsList); //Get Method routes tripList

router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindByCode); //GET Method routes tripsFindByCode - requires param

module.exports = router;