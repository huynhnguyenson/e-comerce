# Sử dụng image Node.js từ Docker Hub
FROM node:16

# Tạo thư mục làm việc cho ứng dụng trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies cho dự án
RUN npm install --only=production

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Cấu hình các biến môi trường
ENV NODE_ENV=production

# Expose cổng mà ứng dụng Express sẽ chạy (5000 theo .env file)
EXPOSE 5000

# Chạy lệnh để khởi động ứng dụng
CMD ["node", "src/server.js"]  # Cập nhật đường dẫn đến server.js
