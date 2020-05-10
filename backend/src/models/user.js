const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validation = require("validator");
const jwt = require("jsonwebtoken");
const Book = require("./Book");
require("dotenv").config();

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
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
      lowercase: true,
      trim: true,
      required: true,
      validate: {
        validator: function (value) {
          if (value.length < 5) {
            throw new Error("Password must contain at least 5 characters");
          }
        },
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET);

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email, password });

  if (!user) {
    throw new Error();
  }

  return user;
};

userSchema.pre("remove", async function (next) {
  await Book.deleteMany({ owner: this._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
