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
  },
  {
    timestamps: true,
  }
);
module.exports = mongose.model("order", Order);
