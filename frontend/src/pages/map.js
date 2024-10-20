// import { useEffect } from 'react';
// import './map.scss';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css'; // Import CSS của Leaflet để bản đồ hiển thị đúng cách
// import path from '../asset/em.jpg'; // Đảm bảo đường dẫn đúng tới hình ảnh của bạn
// import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'; // Import thư viện GeoSearch
// import locations from './locations.json'
// const Map = () => {
//   useEffect(() => {
//     // Thiết lập thông số cho bản đồ
//     const mapOptions = {
//       center: [10.762622, 106.660172], // Tọa độ trung tâm là TP. Hồ Chí Minh
//       zoom: 15, // Zoom gần hơn để thấy rõ marker
//     };

//     // Khởi tạo bản đồ
//     const map = L.map('map', mapOptions);

//     // Khai báo lớp bản đồ
//     const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//     });

//     // Thêm lớp bản đồ vào bản đồ
//     map.addLayer(layer);

//     // Tạo icon tùy chỉnh
//     const gpsIcon = L.icon({
//       iconUrl: path, // Đường dẫn tới icon của bạn
//       iconSize: [100, 100], // Kích thước của icon
//       iconAnchor: [25, 50], // Điểm neo của icon
//       popupAnchor: [0, -50], // Khoảng cách popup so với icon
//     });

//     // Thêm các điểm từ locations.json vào bản đồ
//     locations.forEach((location) => {
//       L.marker(location.coordinates, { icon: gpsIcon })
//         .addTo(map)
//         .bindPopup(`<b>${location.name}</b><br>${location.description}`);
//     });

//     // Cấu hình tìm kiếm với OpenStreetMapProvider
//     const provider = new OpenStreetMapProvider();

//     // Thêm thanh tìm kiếm vào bản đồ
//     const searchControl = new GeoSearchControl({
//       provider: provider,
//       style: 'bar', // Kiểu thanh tìm kiếm
//       autoComplete: true, // Tự động hoàn thành
//       autoCompleteDelay: 250, // Độ trễ khi tự động hoàn thành
//       searchLabel: 'Nhập vị trí tìm kiếm...', // Nhãn cho ô tìm kiếm
//       keepResult: true, // Giữ kết quả sau khi tìm kiếm
//     });

//     // Thêm thanh tìm kiếm vào bản đồ
//     map.addControl(searchControl);

//     // Clean-up khi component unmounts
//     return () => {
//       map.remove();
//     };
//   }, []);

//   return (
//     <div className="map">
//       <div className="left"></div>
//       <div className="middle">
//         <h1>Map to your heart</h1>
//         <div id="map" style={{ height: '400px', width: '100%' }}></div> {/* Bản đồ sẽ hiển thị tại đây */}
//       </div>
//       <div className="right"></div>
//     </div>
//   );
// };

// export default Map;
