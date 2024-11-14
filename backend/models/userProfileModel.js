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
  workoutPlan: [
    {
      day: String, // e.g., 'Monday', 'Tuesday'
      exercises: [
        {
          name: String, // e.g., 'Bench Press'
          sets: Number,
          reps: Number,
          weight: Number // weight used for this exercise
        }
      ]
    }
  ],
  dietPlan: [
    {
      day: String, // e.g., 'Monday', 'Tuesday'
      meals: [
        {
          type: String, // e.g., 'Breakfast', 'Lunch', 'Dinner'
          foodItems: [
            {
              name: String, // e.g., 'Chicken Breast'
              calories: Number,
              macros: {
                protein: Number,
                carbs: Number,
                fats: Number
              }
            }
          ]
        }
      ]
    }
  ]
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
