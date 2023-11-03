const mongose = require("mongoose");
const Order = new mongose.Schema(
  {
    id: { type: String },
    userId: { type: String },
    status: { type: String, default: "Pending" },
    fullName: { type: String },
    order: {
      type: Array,
    },
    address: { type: Object },
    reviewStatus: { type: Boolean, default: false },
    review: { type: String, default: "" },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongose.model("order", Order);
