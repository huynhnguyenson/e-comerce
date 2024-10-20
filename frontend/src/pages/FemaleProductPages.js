import React, { useState, useEffect } from 'react';
import './FemaleProductPages.scss'; // Đảm bảo rằng bạn đã tạo file CSS để styling cho component Body
import bg2 from '../asset/bg2.jpg'; 

import Footer from '../components/Footer';
import { getAllProductByKind } from '../services/api';
import ProductCard from '../components/ProductCard';


const FemaleProductPages = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const fetchAllProductsByKind = async () => {
    try {
      const res = await getAllProductByKind("femaleproduct");
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
    <div className="FemaleProductPages">
          <div className="ImageBackground"><img src={bg2} alt="Logo" /></div>
          <div className='titlepage'>Chuyên mục giày cho nữ</div>
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

export default FemaleProductPages;
