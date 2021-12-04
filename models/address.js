const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("Address", addressSchema);
