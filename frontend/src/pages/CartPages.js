import ProductPiece from '../components/ProductPiece';
import './CartPages.scss';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getCartByUserId } from '../services/api';

const CartPages = () => {
    const userId = useSelector((state) => state.user.account.id);
    const [cartItems, setCartItems] = useState([]);

    const fetchListProductIncartfromUser = async () => {
        try {
            let res = await getCartByUserId(userId); // Gọi API lấy dữ liệu
            // console.log("check res list", res);
            setCartItems(res.cartItems || []);
        } catch (error) {
            console.error('Có lỗi khi lấy giỏ hàng:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchListProductIncartfromUser();
        }
    }, [userId]);

    return (
        <div className="CartPages">
            <h1 className="pageTitle">Danh sách sản phẩm trong giỏ hàng của bạn</h1>
        
            <div className="product-grid-header">
                <div className="header-name">Tên sản phẩm</div>
                <div className="header-quantity">Số lượng</div>
                <div className="header-price">Giá</div>
            </div>

            <div className="product">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <ProductPiece key={index} ProductId={item.productId} />
                    ))
                ) : (
                    <p>Giỏ hàng trống</p>
                )}
            </div>
        </div>
    );
};

export default CartPages;
