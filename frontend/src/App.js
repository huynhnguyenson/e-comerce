import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPages from './pages/SignUpPage';
import Menu from './components/Menu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Map from './pages/map';
import UserProfile from './pages/UserProfile';
import CartPages from './pages/CartPages';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import MaleProductPages from './pages/MaleProductPages';
import FemaleProductPages from './pages/FemaleProductPages';
import DynamicProductPage from './pages/dynamicProductPage';
import About from './pages/about';
import { Navigate } from 'react-router-dom';

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' || location.pathname === '/about';
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Lấy thông tin xác thực từ Redux

  return (
    <div className="App">
      {!isLoginPage && <Menu />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPages />} />
          <Route path="/map" element={<Map />} />
          <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/maleproduct" element={<MaleProductPages />} />
          <Route path="/femaleproduct" element={<FemaleProductPages />} />
          <Route path="/dynamicproduct" element={<DynamicProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/" />} />
          <Route path="/cartPage" element={isAuthenticated ? <CartPages /> : <Navigate to="/" />} />
          <Route path="/paymentpage" element={isAuthenticated ? <PaymentPage /> : <Navigate to="/" />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </div>
      <ToastContainer position="top-left" /> {/* Thay đổi vị trí tại đây */}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
