// src/models/order.js
'use strict';
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const { Product } = require('./product'); // Import model Product

class Order extends Model {}

// Định nghĩa model Order
Order.init(
  {
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
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true,
  }
);

// Thiết lập quan hệ
Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = { Order };
