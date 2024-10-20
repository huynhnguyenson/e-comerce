import React, { useState } from 'react';
import './ProductCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from '../services/api'; 
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const ProductCard = ({ product, width, height }) => {
  const { id, name, description, price, image } = product;
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate(); 
  const userId = useSelector((state) => state.user.account.id);

  const imageUrl = image && image.data
    ? `data:image/jpeg;base64,${arrayBufferToBase64(image.data)}`
    : 'path/to/placeholder-image.jpg';

  const handleAddToCart = async () => {
    const cartItem = {
      userId,
      productId: id,
      quantity: 1,
    };

    try {
      const response = await addToCart(cartItem);
      setMessage(response.message);
    } catch (error) {
      setMessage('Lỗi khi thêm sản phẩm vào giỏ hàng: ' + error.message);
    }
  };

  const handleBuyNowClick = () => {
    navigate('/paymentpage', { state: { product: product } });
  };

  return (
    <div 
      className="product-card"
      style={{ width, height }}
    >
      <div className="product-image">
        <img src={imageUrl} alt={name} />
        <div className="overlay">
          <div className="product-description">{description}</div>
          <div className='ButtonSection'>
            <button className="buy-button" onClick={handleBuyNowClick}>
              <FontAwesomeIcon icon={faMoneyBillWave} /> Mua ngay
            </button>
            <button 
              className="add-to-cart-button" 
              onClick={handleAddToCart} 
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
      <div className="product-name">{name}</div>
      <div className="product-price">{price} vnd</div>
      {message && <p className="cart-message">{message}</p>}
    </div>
  );
};

export default ProductCard;
