import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './Footer.scss'; // Nhớ tạo file CSS tương ứng để thêm style

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="footer-title">Thông tin doanh nghiệp</h2>
          <p>Công ty Cổ phần Giày Thời Trang</p>
          <p>GPDKKD: 123456789 do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 01/03/2020.</p>
          <p>GPMXH: 123/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 15/08/2021.</p>
          <p>Địa chỉ: 123 Đường Giày, P.Bình Thạnh, Q.1, TP.Hồ Chí Minh.</p>
          <p>Địa chỉ liên hệ và gửi chứng từ: Lô B1-2, Đường 15, P.An Bình, TP.Thủ Đức, TP.Hồ Chí Minh.</p>
          <p>Điện thoại: 028 12345678.</p>
          <p>Email: cskh@giaythoidai.com.</p>
          <p>Chịu trách nhiệm nội dung: Huỳnh Nguyễn Sơn.</p>
          <p>Email: hotro@giaythoidai.com.</p>
          <p><a href="/privacy-policy">Xem chính sách sử dụng tại đây</a>.</p>
        </div>

        <div className="footer-section">
          <h2 className="footer-title">Liên kết</h2>
          <ul className="footer-links">
            <li><a href="/about">Về chúng tôi</a></li>
            <li><a href="/services">Dịch vụ</a></li>
            <li><a href="/contact">Liên hệ</a></li>
            <li><a href="/privacy-policy">Chính sách bảo mật</a></li>
            <li><a href="/terms">Điều khoản sử dụng</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2 className="footer-title">Theo dõi chúng tôi</h2>
          <div className="footer-social-media">
            <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" size="2x" />
            </a>
            <a href="https://www.tiktok.com/@yourusername" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} className="social-icon" size="2x" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Công ty Cổ phần Giày Thời Trang. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
}

export default Footer;
