var express = require("express");
var router = express.Router();
const moment = require("moment");

const Booking = require("../models/bookings");
const Trip = require("../models/trips");

/* GET AllBookings listing. */
router.get("/", function (req, res) {
  Booking.find().then((data) => {
    res.json({ allBookings: data });
  });
});

/* Post Trips in Bookings with departure, arrival and price. */
router.post("/new", async (req, res) => {
  const { departure, arrival, date, price } = req.body;
  Booking.findOne({ departure, arrival, date, price }).then((data) => {
    if (data === null) {
      // Creates new document with Trips data
      const newBookings = new Booking({
        departure: departure,
        arrival: arrival,
        date: date,
        price: price,
        isPaid: false,
      });

      // Finally save in database
      newBookings.save().then((newDoc) => {
        res.json({ Booking: newDoc });
      });
    } else {
      // Trips already exists in database
      res.json({ result: false, error: "Booking already saved" });
    }
  });
});

module.exports = router;
