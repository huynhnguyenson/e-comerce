import React, { useState, useEffect } from 'react';
import './MaleProductPages.scss'; // Đảm bảo rằng bạn đã tạo file CSS để styling cho component Body
import bg3 from '../asset/bg3.jpg'; 

import Footer from '../components/Footer';
import { getAllProductByKind } from '../services/api';
import ProductCard from '../components/ProductCard';


const MaleProductPages = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllProductsByKind = async () => {
    try {
      const res = await getAllProductByKind("maleproduct");
      setProducts(res.data);
    } catch (error) {
      setError('Error fetching products.');
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProductsByKind();
  }, []);

  return (
    <div className="MaleProductPages">
          <div className="ImageBackground"><img src={bg3} alt="Logo" /></div>
          <div className='titlepage'>Chuyên mục giày cho nam</div>
        <div className="productcartsection">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                width="250px"   
                height="400px"
              />
            ))
          ) : (
            <p className="no-products-message">Không có sản phẩm nào để hiển thị.</p>
          )}
        </div>
        <div className="footer-section"><Footer /></div></div>
  );
};

export default MaleProductPages;
