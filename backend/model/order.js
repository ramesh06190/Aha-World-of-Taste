const mongose = require("mongoose");
const Order = new mongose.Schema(
  {
    id: { type: String },
    userId: { type: String },
    status: { type: String, default: "Pending" },
    order: {
      type: Array,
    },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongose.model("order", Order);
