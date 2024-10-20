// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Đảm bảo rằng tất cả các hàm từ authController đã được export đúng cách
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout); // Đảm bảo rằng hàm `logout` tồn tại trong `authController`

module.exports = router;
