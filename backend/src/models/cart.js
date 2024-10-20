'use strict';
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database'); // Đảm bảo sequelize được nhập khẩu đúng cách

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
    timestamps: false, // Thay đổi thành true nếu bạn cần timestamps
  }
);

module.exports = { Cart };
