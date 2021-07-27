const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
var Admin = mongoose.model("Admins", AdminSchema);
module.exports = Admin;
