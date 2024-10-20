// src/models/product.js
'use strict';
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database');

class Product extends Model {
  static associate(models) {
    Product.hasMany(models.Review, {
      foreignKey: 'productId',
      as: 'reviews',
    });

    Product.belongsToMany(models.User, {
      through: models.Cart,
      as: 'users',
      foreignKey: 'productId',
      otherKey: 'userId',
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    kind: { // Thêm trường kind
      type: DataTypes.ENUM('maleproduct', 'femaleproduct'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true,
  }
);

module.exports = { Product };
