import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faMale, faFemale, faTags, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Menu.scss'; // Tạo file CSS để styling cho menu
import Avatar from './Avatar';
import { useSelector } from 'react-redux';
import UpProductForAdmin from '../pages/UpProductForAdmin';
import logo from '../asset/logo.png';
import { Link } from 'react-router-dom';
import SearchModal from './SearchModal'; // Import SearchModal
import NotificNumber from './notificNumber';

const Menu = () => {
  const userId = useSelector((state) => state.user.account.id);
  const role = useSelector((state) => state.user.account.role);
  const [isModalUploadShow, setIsModalUploadShow] = useState(false);
  const [isSearchModalShow, setIsSearchModalShow] = useState(false); // Thêm state cho modal tìm kiếm

  const handleToggleUpload = () => {
    setIsModalUploadShow((prev) => !prev);
  };

  const handleToggleSearch = () => {
    setIsSearchModalShow((prev) => !prev);
  };

  return (
    <>
      <div className="menu-container">
        <div className='content'>
          <div className="menu-items">
            <div className="menu-logo"> <img src={logo} alt="Logo" /></div>
            <Link to="/Home" className="menu-item">
              <FontAwesomeIcon icon={faHome} className="menu-icon" />
              Trang chủ
            </Link>
            <a href="#" className="menu-item" onClick={handleToggleSearch}> {/* Chuyển đến modal tìm kiếm */}
              <FontAwesomeIcon icon={faSearch} className="menu-icon" />
              Tìm kiếm
            </a>
            <Link to="/maleproduct" className="menu-item">
              <FontAwesomeIcon icon={faMale} className="menu-icon" />
              Giày nam
            </Link>
            <Link to="/femaleproduct" className="menu-item">
              <FontAwesomeIcon icon={faFemale} className="menu-icon" />
              Giày nữ
            </Link>
            <Link to="/sales" className="menu-item">
              <FontAwesomeIcon icon={faTags} className="menu-icon" />
              Sales
            </Link>
            <Link to="/cartPage" className="menu-item">
              <FontAwesomeIcon icon={faShoppingCart} className="menu-icon menu-icon-cart" />
              Giỏ hàng
              <div className='notific'><NotificNumber userId={userId}/></div>
            </Link>
            {role === 'admin' && (
              <a href="#" className="menu-item" onClick={handleToggleUpload}>
                <FontAwesomeIcon icon={faPlus} className="menu-icon" />
                Thêm sản phẩm
              </a>
            )}
            <Link to={`/profile`} className="menu-item">
              <Avatar userId={userId} width="50px" height="50px" />
            </Link>
          </div>
        </div>
      </div>
      {/* Conditional rendering of UpProductForAdmin */}
      {isModalUploadShow && <UpProductForAdmin onClose={handleToggleUpload} />}
      {/* Conditional rendering of SearchModal */}
      {isSearchModalShow && <SearchModal onClose={handleToggleSearch} />}
    </>
  );
};

export default Menu;
