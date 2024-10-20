import React, { useState, useEffect } from 'react';
import './Avatar.scss';
import { GetUserInfomation } from '../services/api';

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

const Avatar = ({ userId, width = '100%', height = '100%' }) => {
  const [imgData, setImgData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageOfUser = async (id) => {
      try {
        setIsLoading(true);
          const res = await GetUserInfomation(id);
        //   console.log("check res",res)
        setImgData(res.avatar.data); // Giả sử `res.avatar` là mảng byte hoặc dữ liệu base64
      } catch (err) {
        setError('Failed to load image.');
        console.error("Error fetching user info:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchImageOfUser(userId);
    }
  }, [userId]);

  // Kiểm tra kiểu dữ liệu của imgData trước khi chuyển đổi
  const isValidImageData = Array.isArray(imgData) && imgData.length > 0;
  const base64Image = isValidImageData ? arrayBufferToBase64(imgData) : null;

  return (
    <div
      className="Avatar"
      style={{ width, height }} // Áp dụng kích thước từ props
    >
      {isLoading && <div className="avatar-placeholder">Loading...</div>}
      {error && <div className="avatar-placeholder">{error}</div>}
      {base64Image ? (
        <img
          src={`data:image/jpeg;base64,${base64Image}`}
          alt="User Avatar"
          className="avatar-image"
        />
      ) : !isLoading && !error ? (
        <div className="avatar-placeholder">No Image</div>
      ) : null}
    </div>
  );
};

export default Avatar;
