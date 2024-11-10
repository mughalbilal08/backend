// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Signup route
// Example signup route with specific admin role
router.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;
  
    try {
      // Only admin can manually set the 'admin' role
      if (role && role !== 'admin') {
        return res.status(400).json({ message: 'Role must be either "admin" or "customer".' });
      }
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // If role is not provided, it will default to 'customer'
      const newUser = new User({ username, email, password, role: role || 'customer' });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Login route
// routes/auth.js
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
  
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        // Compare password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        // Respond with role and message
        res.status(200).json({
            message: 'Login successful',
            role: user.role,  // Send the role to the frontend
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
  });  

module.exports = router;
