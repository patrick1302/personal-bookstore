const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validation = require("validator");
const bcrypt = require("bcrypt");

const registerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value) {
        if (!validation.isEmail(value)) {
          throw new Error("Must be a valid email ");
        }
      },
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        if (value.length < 5) {
          throw new Error("Password must contain at least 5 characters");
        }
      },
    },
  },
});

// registerSchema.pre("create", function (next) {
//   bcrypt.hash(this.password, 8).then(function (result) {});
//   next();
// });

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
