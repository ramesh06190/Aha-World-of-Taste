const mongose = require("mongoose");
const dish = new mongose.Schema(
  {
    id: { type: String },
    foodName: { type: String },
    category: { type: String },
    likes: {
      type: [String],
      default: [],
    },
    price: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongose.model("dish", dish);
