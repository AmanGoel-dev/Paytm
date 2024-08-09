const mongoose = require("mongoose");
const { string } = require("zod");
mongoose.connect(
  "mongodb connecting string"
);

const userschema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
});
const accountschema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const User = mongoose.model("User", userschema);
const Account = mongoose.model("Account", accountschema);
module.exports = {
  User,
  Account,
};
