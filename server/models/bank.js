const mongoose = require('mongoose');


// Define the schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    lowercase: true, // Converts email to lowercase
    trim: true, // Removes whitespace
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Enforce a minimum password length
  },
  balance: {
    type: Number,
    default: 0, // Default balance is 0 if not provided
    min: 0, // Prevent negative balances
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Hash the password before saving (optional)


// Create the model
const Bankuser = mongoose.model('Bankuser', UserSchema);

module.exports = Bankuser;