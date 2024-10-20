import axios from 'axios';

// Tạo một instance của axios với cấu hình tùy chỉnh
const instance = axios.create({
  baseURL: 'http://localhost:5000/api/', // URL của API\
  // baseURL: 'https://e-comerce-back-tymh.onrender.com/api/',  // URL của API đã deploy
  timeout: 20000, // Thời gian timeout
});

// Thêm token vào header của các yêu cầu
instance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('access_token');
    
    // Nếu có token, thêm vào header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý các lỗi phản hồi từ API
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
