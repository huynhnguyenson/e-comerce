
import './Payment.scss';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getOrdersByUserId } from '../services/api';
import ProductBuy from '../components/ProductBuy';

const Payment = () => {
    const userId = useSelector((state) => state.user.account.id);
    const [orderItems, setOrderItems] = useState([]);

    const fetchListProductInOrder = async () => {
        try {
            let res = await getOrdersByUserId(userId); // Gọi API lấy dữ liệu
            setOrderItems(res.orders || []);
            // console.log("check res order", orderItems);
        } catch (error) {
            console.error('Có lỗi khi lấy giỏ hàng:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchListProductInOrder();
        }
    }, [userId]);

    return (
        <div className="Payment">
            <h1 className="pageTitle">Danh sách sản phẩm đơn hàng của bạn</h1>
            
            {/* Hàng tiêu đề cho lưới sản phẩm */}
            <div className="product-grid-header">
                <div className="header-name">Tên sản phẩm</div>
                <div className="header-quantity">Số lượng</div>
                <div className="header-price">Giá</div>
                <div className="header-statú">Trạng Thái</div>
            </div>

            <div className="product">
                {orderItems.length > 0 ? (
                    orderItems.map((item, index) => (
                        <ProductBuy key={index} ProductId={item.productId} />
                    ))
                ) : (
                    <p>chưa có đơn hàng nào </p>
                )}
            </div>
        </div>
    );
};

export default Payment;

