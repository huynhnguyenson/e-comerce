const { Order } = require('../models/order');
// console.log("check out order",Order)
// Thêm một đơn hàng mới
const addToOrder = async (req, res) => {
    const { userId, totalAmount, status, productId } = req.body;  // Thêm productId

    try {
        // Tạo một đơn hàng mới
        const newOrder = await Order.create({
            userId,
            totalAmount,
            status,
            productId  // Lưu productId vào đơn hàng
        });

        return res.status(201).json({ message: 'Tạo đơn hàng thành công', newOrder });
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};


// Lấy danh sách đơn hàng của người dùng theo userId
const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;  // Lấy userId từ tham số URL

    try {
        // Lấy tất cả các đơn hàng của người dùng
        const orders = await Order.findAll({
            where: { userId },
            attributes: ['id', 'userId', 'totalAmount', 'status', 'productId', 'createdAt', 'updatedAt']  // Thêm productId
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Người dùng chưa có đơn hàng nào' });
        }

        return res.status(200).json({ message: 'Danh sách đơn hàng của người dùng', orders });
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

// Lấy thông tin chi tiết của một đơn hàng theo orderId
const getOrderById = async (req, res) => {
    const { orderId } = req.params;  // Lấy orderId từ tham số URL

    try {
        // Tìm đơn hàng theo orderId
        const order = await Order.findOne({
            where: { id: orderId },
            attributes: ['id', 'userId', 'totalAmount', 'status', 'productId', 'createdAt', 'updatedAt']  // Thêm productId
        });

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        return res.status(200).json({ message: 'Chi tiết đơn hàng', order });
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};


module.exports = { addToOrder, getOrdersByUserId, getOrderById };
