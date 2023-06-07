const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// hashing password before saving the document to the db
userSchema.pre("save", async function () {
  // hashing password only when changed,
  //  because this pre middlware will be executed when updating also.
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
});

// avoid returning the password in the response
userSchema.post("save", function () {
  this.password = undefined;
});

const User = mongoose.model("users", userSchema);
module.exports = User;
