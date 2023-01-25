var express = require("express");
var router = express.Router();

const Booking = require("../models/bookings");

/* GET AllBookings listing. */
router.get("/", function (req, res) {
  Booking.find().then((data) => {
    res.json({ allBookings: data });
  });
});

/* Post new Booking listing. */
router.post("/new", async (req, res) => {
  const { trip } = req.body;

  if (!trip) {
    return res.json({ error: "Missing required fields" });
  }

  // Create a new booking
  const newBooking = new Booking({ trip });
  newBooking.save((err, booking) => {
    if (err) {
      return res.json({ error: "Error creating booking" });
    }
    res.json({ booking });
  });
});

/* Delete Booking listing. */
router.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;

  Booking.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.json({ error: "Error deleting booking" });
    }
    res.json({ message: "Booking deleted successfully" });
  });
});

module.exports = router;
