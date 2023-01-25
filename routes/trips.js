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

/* Get Trips listing with matching departure, arrival and date */
router.get("/match", async (req, res) => {
  const { departure, arrival, date } = req.query;

  if (!departure || !arrival || !date) {
    return res.json({ error: "Missing required fields" });
  }

  try {
    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();
    const trips = await Trip.find({
      departure: { $regex: new RegExp(`^${departure}$`, "i") },
      arrival: { $regex: new RegExp(`^${arrival}$`, "i") },
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    if (!trips) {
      return res.json({ error: "Trip not found" });
    }
    return res.json(trips);
  } catch (error) {
    return res.json({ error: "Error searching for trip" });
  }
});

module.exports = router;
