// middleware/verifytoken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  // Lấy token từ header của request
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token không tồn tại' });
  }

  // Kiểm tra token hợp lệ
  const tokenWithoutBearer = token.split(' ')[1]; // Loại bỏ tiền tố "Bearer"
  
  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }

    // Lưu thông tin người dùng vào request để sử dụng trong các route tiếp theo
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
