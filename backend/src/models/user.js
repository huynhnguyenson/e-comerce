'use strict';
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database'); // Đảm bảo đúng đường dẫn

class User extends Model {
  static associate(models) {
    User.hasMany(models.Cart, {
      foreignKey: 'userId',
      as: 'carts',
    });

    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
    });

    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });

    User.belongsToMany(models.Product, {
      through: models.Cart,
      as: 'cartProducts',
      foreignKey: 'userId',
      otherKey: 'productId',
    });
  }

  // Hàm kiểm tra mật khẩu
  async checkPassword(password) {
    // So sánh mật khẩu bình thường mà không mã hóa
    return password === this.password;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    sequelize, // Đảm bảo sequelize được truyền đúng
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    hooks: {
      // Bỏ mã hóa mật khẩu trước khi lưu
      beforeCreate: async (user) => {
        // Không mã hóa mật khẩu nữa
      },
    },
  }
);

module.exports = User;
