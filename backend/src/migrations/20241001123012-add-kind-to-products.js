'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm trường kind với allowNull là true
    await queryInterface.addColumn('Products', 'kind', {
      type: Sequelize.ENUM('maleproduct', 'femaleproduct'),
      allowNull: true, // Thay đổi từ false sang true
    });

    // Cập nhật tất cả các bản ghi với giá trị mặc định
    await queryInterface.sequelize.query(
      `UPDATE "Products" SET kind = 'maleproduct' WHERE kind IS NULL;`
    );

    // Thay đổi allowNull thành false sau khi cập nhật
    await queryInterface.changeColumn('Products', 'kind', {
      type: Sequelize.ENUM('maleproduct', 'femaleproduct'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'kind');
  },
};
