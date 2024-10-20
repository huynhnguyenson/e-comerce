const jwt = require('jsonwebtoken');
require('dotenv').config(); // Để lấy JWT_SECRET từ file .env

const GetTokenInformation = (token) => {
  try {
    // Giải mã token mà không cần xác thực
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      console.log("Token không hợp lệ hoặc không thể giải mã");
      return null;
    }

    console.log("Thông tin token (giải mã mà không xác thực):", decoded);

    // Nếu muốn xác thực token và lấy thông tin
    const verifiedDecoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Thông tin token (sau khi xác thực):", verifiedDecoded);
    
    return verifiedDecoded;
  } catch (error) {
    console.error("Lỗi khi giải mã token:", error);
    return null;
  }
};

module.exports = GetTokenInformation;
