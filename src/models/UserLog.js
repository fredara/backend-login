const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


const UsersLogSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },

  token_user: {
    type: String,
    unique: false,
    lowercase: true,
    required: true,
  }
});


module.exports = model("userslog", UsersLogSchema);
