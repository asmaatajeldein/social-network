const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
