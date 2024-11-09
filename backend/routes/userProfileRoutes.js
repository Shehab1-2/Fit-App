const express = require('express');
const router = express.Router();
const UserProfile = require('../models/userProfileModel.js');

// Middleware to validate userId in the request
const validateUserId = (req, res, next) => {
  if (!req.body.userId && !req.params.userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  next();
};

// POST /update-profile
router.post('/update-profile', validateUserId, async (req, res) => {
  const { userId, gender, height, weight, fitnessGoals, currentActivityLevel, dietaryPreferences } = req.body;
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { gender, height, weight, fitnessGoals, currentActivityLevel, dietaryPreferences },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating profile:', error);  // Log error for debugging
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// POST /update-bmi
router.post('/update-bmi', validateUserId, async (req, res) => {
  const { userId, bmi } = req.body;
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { bmi },
      { new: true }
    );
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json({ message: 'BMI updated successfully', profile });
  } catch (error) {
    console.error('Error updating BMI:', error);  // Log error for debugging
    res.status(500).json({ message: 'Error updating BMI', error: error.message });
  }
});

// POST /add-weight
router.post('/add-weight', validateUserId, async (req, res) => {
  const { userId, weight, date } = req.body;
  try {
    const profile = await UserProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    profile.weights.push({ weight, date });
    await profile.save();

    res.status(200).json({ message: 'Weight added successfully', weights: profile.weights });
  } catch (error) {
    console.error('Error adding weight:', error);  // Log error for debugging
    res.status(500).json({ message: 'Error adding weight', error: error.message });
  }
});

// GET /profile/:userId
router.get('/profile/:userId', validateUserId, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error retrieving profile:', error);  // Log error for debugging
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
  }
});

// GET /weights/:userId
router.get('/weights/:userId', validateUserId, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId }).select('weights -_id');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json({ weights: profile.weights });
  } catch (error) {
    console.error('Error retrieving weights:', error);  // Log error for debugging
    res.status(500).json({ message: 'Error retrieving weights', error: error.message });
  }
});

module.exports = router;
