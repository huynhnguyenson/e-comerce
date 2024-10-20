import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.scss'; // Bạn có thể thêm SCSS tùy chỉnh cho trang thanh toán
import { addOrder } from '../services/api'; // Import API addOrder
import { useSelector } from 'react-redux';

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

const PaymentPage = () => {
  const navigate = useNavigate();

  // Lấy thông tin sản phẩm từ React Router (khi được truyền từ trang trước)
  const location = useLocation();
  const productDataFromProductCard = location.state?.product ; // Dữ liệu sản phẩm được truyền từ nút "Thanh toán" trước đó
  const productDataFromCartPages = location.state?.productFromCart ; // Dữ liệu sản phẩm được truyền từ trang giỏ hàng
  const productData = productDataFromProductCard || productDataFromCartPages; // Ưu tiên sử dụng dữ liệu nếu biến nào có giá trị
  // console.log("check data in payment", productDataFromCartPages)
  // console.log("check data in payment", productDataFromProductCard)

    const productImagefromCart = productDataFromCartPages?.image;
    const ProductImagefromCard = productData?.image?.data;
    const imagePr = ProductImagefromCard || productImagefromCart;
    const imageUrl = imagePr
  ? `data:image/jpeg;base64,${typeof imagePr === 'object' ? arrayBufferToBase64(imagePr) : imagePr}`
  : 'path/to/placeholder-image.jpg'; // Cung cấp ảnh dự phòng nếu không có ảnh

  const userId = useSelector((state) => state.user.account.id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn bị dữ liệu đơn hàng để gửi lên API
    const orderData = {
      userId: userId, // Thay thế bằng ID người dùng thực tế (ví dụ: từ Redux state hoặc context)
      productId: productData.id, // Thêm productId
      totalAmount: productData.price * productData.stock, // Tổng số tiền của đơn hàng
      status: 'pending', // Trạng thái mặc định của đơn hàng
      ...formData // Thêm thông tin người dùng nhập vào
    };

    try {
      // Gọi API để thêm đơn hàng
      const response = await addOrder(orderData);
      console.log('Đơn hàng đã được thêm:', response);

      // Điều hướng tới trang thành công nếu thanh toán thành công
      navigate('/payment-success');
    } catch (error) {
      console.error('Có lỗi khi thêm đơn hàng:', error);
    }
  };

  return (
    <div className="PaymentPage">
      <h2>Thanh toán sản phẩm</h2>
      
      {productData ? (
        <div className="product-summary">
          <h3 className='productname'>{productData.name}</h3>
                  <img src={imageUrl} alt={productData.name} />
          <p className='productquantity'>Số lượng: {productData.stock}</p>
          <p className='productPrize'>Giá: đ {productData.price} vnd</p>
        </div>
      ) : (
        <p>Không có sản phẩm nào để thanh toán.</p>
      )}

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input 
            type="text" 
            id="address" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Phương thức thanh toán</label>
          <select 
            name="paymentMethod" 
            value={formData.paymentMethod} 
            onChange={handleChange}
            required
          >
            <option value="creditCard">Thẻ tín dụng</option>
            <option value="bankTransfer">Chuyển khoản ngân hàng</option>
            <option value="cod">Thanh toán khi nhận hàng</option>
          </select>
        </div>

        <button type="submit" className="btn-pay">Thanh toán</button>
      </form>
    </div>
  );
};

export default PaymentPage;
