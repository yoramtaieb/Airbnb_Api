const express = require('express');
const signInRouter = express.Router();

const userController = require('../src/controllers/User');

// Route Login
signInRouter.get('/signin', (req, res) => {
  res.json({ message: 'page Signin OK!!' });
});

signInRouter.post('/signin', userController.signIn);

module.exports = signInRouter;
