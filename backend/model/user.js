const mongose = require("mongoose");
const chatMessageSchema = new mongose.Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const userSchema = new mongose.Schema(
  {
    id: { type: String },
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    addres: { type: String },
    mobile: { type: String },
    resetToken: { type: String },
    image: { type: String },
    addresses: [
      {
        id: { type: String },
        addressType: { type: String },
        buildingBlock: { type: String },
        houseFloor: { type: String },
        landmarkArea: { type: String },
      },
    ],
    cart: {
      type: [],
    },
    chatMessages: [chatMessageSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongose.model("user", userSchema);
