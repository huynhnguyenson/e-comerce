// controllers/ProductController.js
const { sequelize } = require('../database'); // Ensure correct import path
const { Product } = require('../models/product'); // Adjust import if necessary
const { Op } = require('sequelize');
const createProduct = async (req, res) => {
  const t = await sequelize.transaction(); // Bắt đầu giao dịch

  try {
    const { name, description, price, stock, kind } = req.body; // Lấy kind từ req.body
    const image = req.file;

    // Tạo sản phẩm mới với giao dịch
    const newProduct = await Product.create(
      {
        name,
        description,
        price,
        stock,
        kind, // Thêm kind vào đối tượng sản phẩm
        image: image ? image.buffer : null,
      },
      { transaction: t }
    );

    // Cam kết giao dịch
    await t.commit();
    res.status(201).json({
      message: 'Product created successfully!',
      data: newProduct,
    });
  } catch (error) {
    // Hoàn tác giao dịch trong trường hợp có lỗi
    await t.rollback();
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product.', details: error.message });
  }
};


// Function to get all products
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.findAll();

    // Kiểm tra nếu không có sản phẩm nào
    if (!products.length) {
      return res.status(404).json({ message: 'No products found.' });
    }

    // Send the retrieved products as a response
    res.status(200).json({
      message: 'Products retrieved successfully!',
      data: products,
    });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Error retrieving products.', details: error.message });
  }
};

// Function to get a specific product by productId
const getProductById = async (req, res) => {
  const { productId } = req.params; // Lấy productId từ URL

  try {
    // Tìm sản phẩm với productId cụ thể
    const product = await Product.findOne({
      where: { id: productId }
    });

    // Kiểm tra nếu sản phẩm không tồn tại
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Gửi thông tin sản phẩm dưới dạng JSON
    res.status(200).json({
      message: 'Product retrieved successfully!',
      data: product,
    });
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Error retrieving product.', details: error.message });
  }
};

// Function to get products by kind (maleProduct or femaleProduct)
const getProductsByKind = async (req, res) => {
  const { kind } = req.params; // Lấy kind từ tham số URL

  try {
    // Tìm tất cả sản phẩm với giá trị kind cụ thể
    const products = await Product.findAll({
      where: { kind: kind }
    });

    // Kiểm tra nếu không có sản phẩm nào với kind đã cho
    if (!products.length) {
      return res.status(404).json({ message: `No products found for kind: ${kind}.` });
    }

    // Gửi thông tin sản phẩm dưới dạng JSON
    res.status(200).json({
      message: `Products of kind ${kind} retrieved successfully!`,
      data: products,
    });
  } catch (error) {
    console.error('Error retrieving products by kind:', error);
    res.status(500).json({ error: 'Error retrieving products by kind.', details: error.message });
  }
};
const searchProductsByName = async (req, res) => {
  const { name } = req.params; // Lấy tên từ tham số URL

  try {
    // Tìm tất cả sản phẩm có tên chứa giá trị name
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%` // Sử dụng toán tử LIKE để tìm kiếm
        }
      }
    });

    // Kiểm tra nếu không có sản phẩm nào với tên đã cho
    if (!products.length) {
      return res.status(404).json({ message: `No products found with name containing: ${name}.` });
    }

    // Gửi thông tin sản phẩm dưới dạng JSON
    res.status(200).json({
      message: "retrieved successfully!",
      data: products,
    });
  } catch (error) {
    console.error('Error searching products by name:', error);
    res.status(500).json({ error: 'Error searching products by name.', details: error.message });
  }
};



module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByKind,
  searchProductsByName
};
