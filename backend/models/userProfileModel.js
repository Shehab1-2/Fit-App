// models/userProfileModel.js
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gender: String,
  height: Number,
  fitnessGoals: String,
  bmi: { type: Number, default: 0 },
  weights: [
    {
      weight: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  currentActivityLevel: String,
  dietaryPreferences: String,
  workoutPlan: String,
  dietPlan: String
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
