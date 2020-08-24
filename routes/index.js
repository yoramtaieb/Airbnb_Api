const express = require('express');
const router = express.Router();
const signUpRouter = require('./signUpRouter');
const signInRouter = require('./signInRouter');
const placesRouter = require('./placesRouter');

const bodyParser = require('body-parser');

// Middleware
router.use(bodyParser.json());

//Page accueil
router.get('/', (request, response) => {
  response.json({ message: 'Hello World !' });
});

// Routes
router.use('/api', signUpRouter);
router.use('/api', signInRouter);
router.use('/api', placesRouter);

// View page 404, lorsqu'on ne trouve pas l'une des routes
router.use('*', (request, response) => {
  response.status(404).json({
    error: 'Oups, error !',
  });
});

module.exports = router;
