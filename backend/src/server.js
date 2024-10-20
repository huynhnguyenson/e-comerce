const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Cấu hình CORS
const corsOptions = {
  // origin: 'https://e-comerce-website-7115.onrender.com', // Thay bằng domain của frontend
    origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Nếu bạn sử dụng cookie, auth headers
};

// Sử dụng CORS với cấu hình
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Import routes
const authRoutes = require('./routes/authRoutes');
const tokenRoutes = require('./routes/tokenRoutes'); // Import the new route
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/ProductRoutes'); 
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/token', tokenRoutes); // Add the new route
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes); 
app.use('/api/cart', cartRoutes); 
app.use('/api/order', orderRoutes); 

const PORT = process.env.PORT || 5001;
const { connectDB } = require('./database');
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
