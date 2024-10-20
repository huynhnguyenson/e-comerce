// middleware/CheckAdminToken.js
const CheckAdminToken = (req, res, next) => {
  // Kiểm tra xem user đã được xác thực hay chưa
  if (!req.user) {
    return res.status(401).json({ message: 'Token chưa được xác thực' });
  }

  // Kiểm tra quyền admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Không có quyền truy cập, yêu cầu quyền admin' });
  }

  next(); // Tiếp tục xử lý route nếu là admin
};

module.exports = CheckAdminToken;
