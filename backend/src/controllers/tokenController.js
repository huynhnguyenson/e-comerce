const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure this is present to access JWT_SECRET

const verifyToken = (token) => {
  try {
    // Decode the token without verifying it
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      console.log("Token không hợp lệ hoặc không thể giải mã");
      return { error: 'Token không hợp lệ' };
    }

    console.log("Thông tin token (giải mã mà không xác thực):", decoded);

    // Verify the token and get the information
    const verifiedDecoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Thông tin token (sau khi xác thực):", verifiedDecoded);
    
    return verifiedDecoded;
  } catch (error) {
    console.error("Lỗi khi giải mã token:", error.message);
    return { error: 'Lỗi khi giải mã token' };
  }
};

// Controller function to handle the HTTP request
const getTokenInformation = (req, res) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Remove "Bearer "

  if (!token) {
    return res.status(401).json({ message: 'Token không tồn tại' });
  }

  const tokenInfo = verifyToken(token);

  if (tokenInfo.error) {
    return res.status(401).json({ message: tokenInfo.error });
  }

  res.status(200).json({ message: 'Token hợp lệ', tokenInfo });
};

module.exports = { getTokenInformation };
