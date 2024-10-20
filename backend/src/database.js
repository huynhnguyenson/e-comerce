require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Yêu cầu SSL
      rejectUnauthorized: false, // Tùy chọn này cần thiết cho một số môi trường
    },
  },
  define: {
    freezeTableName: true, // Đảm bảo table không bị tự động thêm 's'
    timestamps: true, // Tự động thêm trường createdAt và updatedAt
  },
  logging: false, // Tắt logging nếu không muốn hiển thị log của Sequelize
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối cơ sở dữ liệu thành công.');
  } catch (error) {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
  }
};

module.exports = { sequelize, connectDB };
