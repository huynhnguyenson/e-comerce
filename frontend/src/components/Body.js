import React, { useState, useEffect } from 'react';
import './Body.scss'; // Đảm bảo rằng bạn đã tạo file CSS để styling cho component Body
import bg1 from '../asset/bg1.jpg'; 
import bg2 from '../asset/bg2.jpg'; 
import bg3 from '../asset/bg3.jpg'; 

import Footer from '../components/Footer';
import { getAllProducts } from '../services/api';
import ProductCard from './ProductCard';

const backgrounds = [bg1, bg2, bg3]; // Mảng chứa các hình nền

const Body = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentBg, setCurrentBg] = useState(0); // State để theo dõi hình nền hiện tại

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (error) {
      setError('Error fetching products.');
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Hiệu ứng thay đổi hình nền mỗi 15 giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBg((prevBg) => (prevBg + 1) % backgrounds.length);
    }, 15000); // Thay đổi hình nền mỗi 15 giây

    return () => clearInterval(intervalId); // Clear interval khi component bị hủy
  }, []);

  return (
    <div className="BodyComponent">
      <div className="ImageBackground" style={{ backgroundImage: `url(${backgrounds[currentBg]})` }}>
        <img src={backgrounds[currentBg]} alt="Background" />
      </div>
      <div className="productcartsection">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              width="280px"   
              height="400px"
            />
          ))
        ) : (
          <p className="no-products-message">Không có sản phẩm nào để hiển thị.</p>
        )}
      </div>
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Body;
