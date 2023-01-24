var express = require("express");
var router = express.Router();
const moment = require("moment");

const Trip = require("../models/trips");

/* GET AllTrips listing. */
router.get("/", function (req, res) {
  Trip.find().then((data) => {
    res.json({ allTrips: data });
  });
});

/* GET Trips matching departure and arrival with date. */
router.get("/match", async (req, res) => {
  const { departure, arrival, date } = req.body;

  if (!departure || !arrival || !date) {
    return res.json({ error: "Missing required fields" });
  }

  Trip.find(
    {
      departure,
      arrival,
      date: {
        $gte: moment(date).startOf("day"),
        $lte: moment(date).endOf("day"),
      },
    },
    (err, trip) => {
      if (err) {
        return res.json({ error: "Error searching for trip" });
      }
      if (!trip) {
        return res.json({ error: "Trip not found" });
      }
      res.json(trip);
    }
  );
});

module.exports = router;
