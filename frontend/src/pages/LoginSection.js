import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSection.scss';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Postlogin, SendBackToken } from '../services/api';
import { dologin } from '../redux/action/userAction';
import logo from '../asset/logo.png';

const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = () => {
    setShowLoginForm(true);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let res = await Postlogin(email, password);
      // console.log("check api login",res)
      if (res.message === 'Login successful') {
         dispatch(dologin({
          id: res.user.id,
          username: res.user.username,
          email: res.user.email,
          role:res.user.role,
          token: res.token, // Cập nhật token nếu cần
      }));
        await SendBackToken();
        toast.success(res.message);
        navigate('/home');
      } else {
        toast.error(res.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi trong quá trình đăng nhập:', error.response?.data || error.message);
      toast.error('Đã xảy ra lỗi trong quá trình đăng nhập');
    }

  }

    const handleSignup = () => {
        navigate('/register')
    }
  return (
    <div className="loginSection">
      {!showLoginForm ? (
        <>
          <div className="logoEnterprise">
            <h2>WILDWAYS SOCIAL</h2>
            <img src={logo} alt="Trek Social Logo" />
          </div>
          <div className="btn-container">
            <button className="btn btn-login" onClick={handleLogin}>
              Log In
            </button>
            <button className="btn btn-signup" onClick={handleRegister}>
              Sign Up
            </button>
          </div>
        </>
      ) : (
        <div className="loginForm">
            <div className='header'>
              <h2>LOGIN</h2>
          </div>
            <div className="email">
              <label>Email</label>
                    <input 
                        type="email" 
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
            </div>
            <div className="password">
              <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
            </div>
            <button type="submit" className="btn btn-login"onClick={handleLoginSubmit}>Submit</button>
            <div className='sign-up-link'>
               <b>Don't you have an account yet?</b>
                <button className='btn btn-signup' onClick={handleSignup}>Sign Up</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default LoginSection;
