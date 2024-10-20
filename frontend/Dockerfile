# Sử dụng image node chính thức để build ứng dụng
FROM node:16 AS build

# Đặt thư mục làm việc cho giai đoạn build
WORKDIR /app

# Sao chép file package.json và package-lock.json để cài dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng một image nhẹ nginx để serve file build tĩnh
FROM nginx:alpine

# Sao chép các file build từ giai đoạn build sang nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose cổng mà nginx sẽ chạy
EXPOSE 80

# Chạy nginx
CMD ["nginx", "-g", "daemon off;"]
