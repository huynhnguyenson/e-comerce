import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import './UpProductForAdmin.scss'; // Import SCSS file for custom styling
import { addProduct } from '../services/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpProductForAdmin = ({ onClose }) => {
  const role = useSelector((state) => state.user.account.role);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    kind: 'maleproduct'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (role !== "admin") {
      navigate('/');
    }
  }, [role, navigate]);

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleShare = async () => {
    try {
      await addProduct(product.name, product.description, product.price, product.stock, product.kind, selectedFile);
      alert('Product added successfully!');
      onClose();
    } catch (error) {
      console.error('Error creating product:', error.response ? error.response.data : error.message);
      setError('Failed to create product.');
    }
  };

  return (
    <div className="up-product-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Thêm Sản Phẩm Mới</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="image-preview">
          {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" />}
          <label className="file-upload" onClick={handleSelectFile}>
            <FontAwesomeIcon icon={faImage} size="3x" />
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
          </label>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={product.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          value={product.description}
          onChange={handleInputChange}
          maxLength={281}
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={product.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Số lượng"
          value={product.stock}
          onChange={handleInputChange}
          required
        />
        <select name="kind" value={product.kind} onChange={handleInputChange} required>
          <option value="maleproduct">Nam</option>
          <option value="femaleproduct">Nữ</option>
        </select>
        
        {/* Button Container */}
        <div className="button-container">
          <button className="submit-button" onClick={handleShare}>
            <FontAwesomeIcon icon={faUpload} /> Đăng
          </button>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} /> Huỷ
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpProductForAdmin;
