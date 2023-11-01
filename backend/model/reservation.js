const mongose = require("mongoose");
const Reservation = new mongose.Schema(
  {
    id: { type: String },
    userId: { type: String },
    status: { type: String, default: "Pending" },
    size: { type: String },
    date: { type: String },
    time: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongose.model("reservation", Reservation);
