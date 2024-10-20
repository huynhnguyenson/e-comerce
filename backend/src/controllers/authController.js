const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.register = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    // Kiểm tra các trường dữ liệu bắt buộc
    if (!username || !email || !password || !phone || !address) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết.' });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại.' });
    }

    // Tạo người dùng mới
    const user = await User.create({ username, email, password, phone, address });

    res.status(201).json({ message: 'Register successfully', user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Register failed', error });
  }
};


exports.login = async (req, res) => {
  try {
    console.log('Received data:', req.body); // Kiểm tra dữ liệu nhận được
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    const isPasswordValid = await user.checkPassword(password);
    console.log('Password Valid:', isPasswordValid); // Để kiểm tra kết quả so sánh

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    // Tạo token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Trả về thông tin người dùng và token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error); // Kiểm tra lỗi cụ thể
    res.status(500).json({ message: 'Login failed', error });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Đăng xuất thành công' });
};
