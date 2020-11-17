const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: { type: String, required: true, min: 6, max: 200 },
    email: { type: String, required: true, min: 6, max: 200 },
    password: { type: String, required: true, min: 6, max: 1500 },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
