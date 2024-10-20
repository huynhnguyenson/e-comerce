const { Cart } = require('../models/cart');
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingCartItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (existingCartItem) {
            // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json({ message: 'Cập nhật giỏ hàng thành công', existingCartItem });
        }

        // Nếu không có, tạo một mục giỏ hàng mới
        const newCartItem = await Cart.create({
            userId,
            productId,
            quantity
        });

        return res.status(201).json({ message: 'Thêm vào giỏ hàng thành công', newCartItem });
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

const getCartByUserId = async (req, res) => {
    const { userId } = req.params;  // Lấy userId từ tham số URL

    try {
        // Lấy tất cả các sản phẩm trong giỏ hàng của người dùng
        const cartItems = await Cart.findAll({
            where: { userId },
            attributes: ['productId']  // Chỉ lấy productId
        });

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'Giỏ hàng trống hoặc không tìm thấy' });
        }

        return res.status(200).json({ message: 'Danh sách sản phẩm trong giỏ hàng', cartItems });
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};


const getCartItemQuantity = async (req, res) => {
    const { userId, productId } = req.params; // Lấy userId và productId từ tham số URL

    try {
        // Tìm sản phẩm cụ thể trong giỏ hàng của người dùng
        const cartItem = await Cart.findOne({
            where: { userId, productId },
            attributes: ['quantity']  // Chỉ lấy quantity
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' });
        }

        return res.status(200).json({ message: 'Số lượng sản phẩm trong giỏ hàng', cartItem });
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

const getTotalCartQuantity = async (req, res) => {
    const { userId } = req.params; // Lấy userId từ tham số URL

    try {
        // Tính tổng số lượng sản phẩm trong giỏ hàng của người dùng
        const cartItems = await Cart.findAll({
            where: { userId },
            attributes: ['quantity']  // Chỉ lấy quantity
        });

        // Tính tổng số lượng
        const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

        return res.status(200).json({ message: 'Tổng số lượng sản phẩm trong giỏ hàng', totalQuantity });
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.params; // Lấy userId và productId từ tham số URL

    try {
        // Tìm sản phẩm cụ thể trong giỏ hàng của người dùng
        const cartItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' });
        }

        // Xóa sản phẩm khỏi giỏ hàng
        await cartItem.destroy();

        return res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng', cartItem });
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};
module.exports = { addToCart ,getCartByUserId ,getCartItemQuantity,removeFromCart,getTotalCartQuantity};
