const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validation = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    lowercase: true,
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

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 8);
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
