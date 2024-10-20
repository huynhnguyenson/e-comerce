import React, { useState, useEffect } from 'react';
import './dynamicProductPage.scss';
import backgroundImg1 from '../asset/bg1.jpg';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
const DynamicProductPage = () => {
  const location = useLocation();
  const productDataFromSearching = location.state?.product || []; // Dữ liệu sản phẩm được truyền từ nút "Thanh toán" trước đó

return (
  <div className="DynamicProductPage">
    <div className="ImageBackground"><img src={backgroundImg1} alt="Logo" /></div>
    <div className='titlepage'>Sản phẩm bạn tìm kiếm</div>
    <div className="productcartsection">
      {Array.isArray(productDataFromSearching) && productDataFromSearching.length > 0 ? (
        productDataFromSearching.map(product => (
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
    <div className="footer-section"><Footer /></div>
  </div>
);
};

export default DynamicProductPage;
