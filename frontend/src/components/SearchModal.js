import React, { useState } from 'react';
import './SearchModal.scss'; // Thêm file SCSS cho modal
import { seekproductbyname } from '../services/api'; // Import API tìm kiếm
import { useNavigate } from 'react-router';

const SearchModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate(); //

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await seekproductbyname(searchTerm);
      console.log('Search results:', results); // Log kết quả tìm kiếm
      if (results.message === "retrieved successfully!") {
        navigate('/dynamicproduct', { state: { product: results.data } });
        onClose();
      }
    } catch (error) {
      setError('Lỗi khi tìm kiếm sản phẩm.');
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Tìm kiếm sản phẩm</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
            className="search-input"
          />
          <button type="submit" className="search-button">Tìm kiếm</button>
        </form>
        {loading && <p className="loading-message">Đang tải...</p>} {/* Hiển thị thông báo khi đang tải */}
        {error && <p className="error-message">{error}</p>} {/* Hiển thị thông báo lỗi */}
      </div>
    </div>
  );
};

export default SearchModal;
