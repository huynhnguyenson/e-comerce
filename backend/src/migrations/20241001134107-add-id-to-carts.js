'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm cột 'id' vào bảng 'Carts'
    await queryInterface.addColumn('Carts', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa cột 'id' nếu cần
    await queryInterface.removeColumn('Carts', 'id');
  },
};
