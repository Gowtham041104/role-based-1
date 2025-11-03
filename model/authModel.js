let mongoose = require("mongoose");

let authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "executive",
      enum: ["admin", "executive", "user"],
    },
    formIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "form-data",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("register", authSchema);
