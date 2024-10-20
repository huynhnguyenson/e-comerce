const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Thêm sản phẩm vào giỏ hàng
router.post('/addOne', cartController.addToCart);
router.get('/getListCart/:userId', cartController.getCartByUserId);
router.get('/quantity/:userId/:productId', cartController.getCartItemQuantity);
router.get('/totalquantityofuser/:userId', cartController.getTotalCartQuantity);
router.delete('/remove/:userId/:productId', cartController.removeFromCart);

module.exports = router;
