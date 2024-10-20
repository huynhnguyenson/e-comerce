// src/controllers/userController.js
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

// Cấu hình Multer để lưu trữ ảnh
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Lấy danh sách người dùng
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Không thể lấy danh sách người dùng', error });
  }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'Người dùng đã được tạo thành công', user });
  } catch (error) {
    res.status(400).json({ message: 'Không thể tạo người dùng', error });
  }
};
// src/controllers/userController.js

// Lấy danh sách người dùng
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Không thể lấy danh sách người dùng', error });
  }
};
// Lấy danh sách người dùng
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Không thể lấy danh sách người dùng', error });
  }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'Người dùng đã được tạo thành công', user });
  } catch (error) {
    res.status(400).json({ message: 'Không thể tạo người dùng', error });
  }
};

// Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id); // Tìm người dùng theo ID

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Không thể lấy thông tin người dùng', error });
  }
};

// Tải ảnh avatar lên
exports.uploadAvatar = async (req, res) => {
  try {
    const { id } = req.body;
    const imgData = req.file.buffer; // Dữ liệu ảnh dưới dạng nhị phân

    if (!id) { // Đảm bảo điều kiện kiểm tra id đúng
      return res.status(400).json({ error: 'id là bắt buộc.' });
    }

    // Tìm người dùng theo id
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'Người dùng không tồn tại.' });
    }

    // Cập nhật trường avatar
    user.avatar = imgData;
    await user.save();

    res.status(200).json({
      message: 'Ảnh avatar đã được tải lên thành công!',
      data: user,
    });
  } catch (error) {
    console.error('Lỗi khi tải avatar lên:', error);
    res.status(500).json({ error: 'Lỗi khi tải avatar lên.', details: error.message });
  }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'Người dùng đã được tạo thành công', user });
  } catch (error) {
    res.status(400).json({ message: 'Không thể tạo người dùng', error });
  }
};

// Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id); // Tìm người dùng theo ID

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Không thể lấy thông tin người dùng', error });
  }
};
