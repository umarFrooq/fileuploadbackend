// controllers/userController.js
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const userService = require('../services/userService');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const { name, email, picture, sub } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        name,
        email,
        provider: 'google',
        providerId: sub,
        avatar: picture
      });
    } else if (user.provider !== 'google') {
      // User exists but didn't sign up with Google
      return res.status(400).json({
        error: 'Please use the original login method for this account'
      });
    }

    // Generate JWT token
    const authToken = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(400).json({ 
      error: 'Invalid Google token',
      details: err.message 
    });
  }
};

// ... rest of your controller functions ...

module.exports = {
  // createUser,
  // getUsers,
  // getUserById,
  // updateUser,
  // deleteUser,
  googleLogin
};