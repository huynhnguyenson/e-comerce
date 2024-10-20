const express = require('express');
const { getTokenInformation } = require('../controllers/tokenController'); // Adjust the path as needed

const router = express.Router();

// Define a route to handle the token verification
router.get('/verify-token', getTokenInformation);

module.exports = router;
