const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.post('/', userController.createUser);    
// router.get('/', userController.getUsers);    
// router.post('/auth/google', userController.googleLogin);   
// router.get('/:id', userController.getUserById);  
// router.put('/:id', userController.updateUser);   
// router.delete('/:id', userController.deleteUser); 


const passport = require('passport');
const jwt = require('jsonwebtoken');

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }),
  (req, res) => {
    // Successful authentication
    const token = req.user.token;
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  }
);

// JWT verification endpoint
router.get('/verify', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});


module.exports = router;
