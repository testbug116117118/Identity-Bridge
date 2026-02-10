const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateAuthRequest } = require('../middleware/validators');

// Authorization endpoint
router.get('/authorize', validateAuthRequest, authController.authorize);

// Login endpoint for authorizing a specific client request
router.post('/login', authController.authenticateUser);

// Consent endpoint for user to approve/deny authorization
router.post('/consent', authController.processConsent);

module.exports = router;
