const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Thêm một đơn hàng mới
router.post('/addOrder', orderController.addToOrder);

// Lấy danh sách đơn hàng của người dùng theo userId
router.get('/getOrders/:userId', orderController.getOrdersByUserId);

// Lấy thông tin chi tiết của một đơn hàng theo orderId
router.get('/orderDetail/:orderId', orderController.getOrderById);

module.exports = router;
