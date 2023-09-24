const mongose = require("mongoose");
const userSchema = new mongose.Schema(
  {
    id: { type: String },
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    address: { type: String },
    mobile: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongose.model("user", userSchema);