const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')


const UsersSchema = new Schema({

  name: {
    type: String,
    trim: true,
    required: true,
  },

  lastName: {
    type: String,
    unique: false,
    lowercase: true,
    trim: true,
    required: true,
  },

  identification: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    unique: false,
    trim: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});


//methods encrypt password
UsersSchema.statics.encryptPassword = async (password) => {
  const salt =  await bcrypt.genSalt(10); //method gensalt algoritmo repeat 10 // mientras mas repite mas consumo
  return await bcrypt.hash(password, salt); //method hash encrypt password
};

UsersSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword); //method comparereceives 2 params
};

module.exports = model("users", UsersSchema);
