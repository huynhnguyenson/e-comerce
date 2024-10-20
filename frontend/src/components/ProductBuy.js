import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import './ProductBuy.scss';

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


const ProductBuy = ({ ProductId }) => {
    const [productData, setProductData] = useState(null);
    const [message, setMessage] = useState(''); // Trạng thái để hiển thị thông báo
    
    const fetchProductIn4ByProductId = async () => {
        try {
            const res = await getProductById(ProductId);
            console.log("check res in child component", res);

            // Chuyển đổi hình ảnh sang base64 nếu có
            const imageBase64 = arrayBufferToBase64(res.data.image.data); // Giả sử res.data.image là kiểu ArrayBuffer hoặc Blob
            setProductData({
                ...res.data,
                image: imageBase64 // Thêm hình ảnh đã chuyển đổi vào dữ liệu sản phẩm
            });
        } catch (error) {
            console.error('Có lỗi fetch dữ liệu sản phẩm:', error);
            setMessage('Lỗi khi lấy thông tin sản phẩm: ' + error.message); // Hiển thị thông báo lỗi
        }
    };

    useEffect(() => {
        if (ProductId) {
            fetchProductIn4ByProductId();
        }
    }, [ProductId]);

    return (
        <div className="product-Buy">
            {productData ? (
                <div className="product-details">
                     <div className="product-image">
                        <img src={`data:image/jpeg;base64,${productData.image}`} alt={productData.name} />
                    </div>
                    <h3 className="product-name">{productData.name}</h3>
                    <p className="product-quantity">{productData.stock}</p>
                    <p className="product-price">đ {productData.price} vnd</p>
                    <p className="product-status"> đang vận chuyển </p>
                </div>
            ) : (
                <p>Đang tải thông tin sản phẩm...</p>
            )}
        </div>
    );
};

export default ProductBuy;
