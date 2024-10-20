// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route để lấy thông tin người dùng theo ID
router.get('/getdataUser/:id', userController.getUserById);

// Route để tải ảnh avatar lên
router.post('/upload-avatar', upload.single('avatar'), userController.uploadAvatar);

module.exports = router;
