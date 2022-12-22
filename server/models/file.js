const mongoose = require("mongoose");
// defining schema
const fileSchema = new mongoose.Schema(
  {
    filename: { type: String },
    filepath: { type: String },
    password: { type: String },
    mimetype: { type: String },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);
// creating model
const filecreater = new mongoose.model("filedetails", fileSchema);
module.exports = filecreater;
