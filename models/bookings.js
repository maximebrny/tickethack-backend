const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trips",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
