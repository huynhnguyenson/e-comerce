const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user'); // Đảm bảo đường dẫn đúng
const { sequelize } = require('../database');

const router = express.Router();

router.post('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await sequelize.query(
      'UPDATE "Users" SET "password" = :password WHERE "email" = :email',
      {
        replacements: { password: hashedPassword, email },
      }
    );

    res.status(200).json({ message: 'Mật khẩu đã được mã hóa và cập nhật.' });
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra', error });
  }
});

module.exports = router;
