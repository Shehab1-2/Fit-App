const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Ensure this correctly points to your server file
const User = require('../models/usersModel');
const UserProfile = require('../models/userProfileModel');

// Use a unique database for testing
beforeAll(async () => {
  const url = `${process.env.MONGO_URI}-test`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('API Endpoints', () => {
  let userId;

  beforeEach(async () => {
    // Clear User and UserProfile collections
    await User.deleteMany();
    await UserProfile.deleteMany();

    // Create a test user for subsequent profile tests
    const userRes = await request(app)
      .post('/api/users/signup')
      .send({ username: 'testuser', password: 'testpassword' });

    userId = userRes.body.userId;
  });

  // Signup Test
  it('POST /api/users/signup - Success', async () => {
    const res = await request(app)
      .post('/api/users/signup')
      .send({ username: 'newuser', password: 'newpassword' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  // Login Test
  it('POST /api/users/login - Success', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body).toHaveProperty('userId');
  });

  // Update Profile Test
  it('POST /api/user-profile/update-profile - Success', async () => {
    const res = await request(app)
      .post('/api/user-profile/update-profile')
      .send({
        userId,
        gender: 'male',
        height: 180,
        weight: 75,
        fitnessGoals: 'Lose weight',
        currentActivityLevel: 'Moderate',
        dietaryPreferences: 'Vegetarian'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Profile updated successfully');
    expect(res.body.profile).toHaveProperty('gender', 'male');
  });

  // Update BMI Test
  it('POST /api/user-profile/update-bmi - Success', async () => {
    const res = await request(app)
      .post('/api/user-profile/update-bmi')
      .send({ userId, bmi: 22.5 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'BMI updated successfully');
    expect(res.body.profile).toHaveProperty('bmi', 22.5);
  });

  // Add Weight Test
  it('POST /api/user-profile/add-weight - Success', async () => {
    const res = await request(app)
      .post('/api/user-profile/add-weight')
      .send({ userId, weight: 76, date: new Date().toISOString() });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Weight added successfully');
    expect(res.body.weights.length).toBeGreaterThan(0);
  });

  // Get Profile Test
  it('GET /api/user-profile/profile/:userId - Success', async () => {
    await request(app)
      .post('/api/user-profile/update-profile')
      .send({ userId, gender: 'male' });

    const res = await request(app).get(`/api/user-profile/profile/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('gender', 'male');
  });

  // Get Weights Test
  it('GET /api/user-profile/weights/:userId - Success', async () => {
    await request(app)
      .post('/api/user-profile/add-weight')
      .send({ userId, weight: 76, date: new Date().toISOString() });

    const res = await request(app).get(`/api/user-profile/weights/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.weights.length).toBeGreaterThan(0);
  });
});
