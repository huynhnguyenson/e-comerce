import React, { useEffect, useState } from 'react';
import { getCartItemQuantity, getProductById, removeFromCart } from '../services/api'; // Import removeFromCart
import './ProductPiece.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Hàm chuyển đổi mảng byte thành base64
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

const ProductPiece = ({ ProductId }) => {
    const [productData, setProductData] = useState(null);
    const [message, setMessage] = useState(''); // Trạng thái để hiển thị thông báo
    const userId = useSelector((state) => state.user.account.id);
    const [quantity, setQuantity] = useState(0); // Đặt giá trị mặc định là 0
    const navigate = useNavigate();

    const fetchProductIn4ByProductId = async () => {
        try {
            const res = await getProductById(ProductId);
            // console.log("check res in child component", res);

            // Chuyển đổi hình ảnh sang base64 nếu có
            const imageBase64 = res.data.image.data ? arrayBufferToBase64(res.data.image.data) : null; // Kiểm tra xem có dữ liệu hình ảnh hay không
            setProductData({
                ...res.data,
                image: imageBase64 // Thêm hình ảnh đã chuyển đổi vào dữ liệu sản phẩm
            });
        } catch (error) {
            console.error('Có lỗi fetch dữ liệu sản phẩm:', error);
            setMessage('Lỗi khi lấy thông tin sản phẩm: ' + error.message); // Hiển thị thông báo lỗi
        }
    };

    const fetchQuanityProductInCart = async () => {
        try {
            let res = await getCartItemQuantity(userId, ProductId);
            setQuantity(res.cartItem.quantity);
        } catch (error) {
            console.error('Có lỗi khi lấy số lượng sản phẩm:', error);
        }
    };

    const removeProductFromCart = async () => {
        try {
            await removeFromCart(userId, ProductId);
            setMessage('Sản phẩm đã được xóa khỏi giỏ hàng!'); // Hiển thị thông báo thành công
            setQuantity(0); // Cập nhật lại số lượng về 0
        } catch (error) {
            console.error('Có lỗi khi xóa sản phẩm:', error);
            setMessage('Lỗi khi xóa sản phẩm: ' + error.message); // Hiển thị thông báo lỗi
        }
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0)); // Đảm bảo số lượng không nhỏ hơn 0
    };

    const handleBuyNowClick = () => {
        // Điều hướng tới trang thanh toán và truyền dữ liệu sản phẩm qua state
        navigate('/paymentpage', { state: { productFromCart: productData } });
    };

    useEffect(() => {
        if (ProductId) {
            fetchProductIn4ByProductId();
        }
        if (userId && ProductId) {
            fetchQuanityProductInCart();
        }
    }, [ProductId, userId]);

    return (
        <div className="product-piece">
            {productData ? (
                <div className="product-details">
                    <div className="product-image">
                        <img src={`data:image/jpeg;base64,${productData.image}`} alt={productData.name} />
                    </div>
                    <h3 className="product-name">{productData.name}</h3>
                    <div className="product-quantity">
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    <p className="product-price">đ {productData.price} vnd</p>
                    <div className="product-buttons">
                        <button className="btn-pay" onClick={handleBuyNowClick}>Thanh toán</button>
                        <button className="btn-delete" onClick={removeProductFromCart}>Xóa</button> {/* Gọi hàm xóa ở đây */}
                    </div>
                </div>
            ) : (
                <p>Đang tải thông tin sản phẩm...</p>
            )}
            {message && <p className="message">{message}</p>} {/* Hiển thị thông báo */}
        </div>
    );
};

export default ProductPiece;
