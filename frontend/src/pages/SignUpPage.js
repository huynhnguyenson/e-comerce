import { useState } from 'react';
import './SignUpPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { PostRegister } from '../services/api';

const SignUpPages = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState(""); // Thêm trường số điện thoại
    const [address, setAddress] = useState(""); // Thêm trường địa chỉ
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEyeSlash);
    const navigate = useNavigate();

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(faEye);
            setType('text');
        } else {
            setIcon(faEyeSlash);
            setType('password');
        }
    };

 const handleRegister = async (event) => {
  event.preventDefault();
  try {
    const data = await PostRegister(username, email, password, phone, address);
    if (data && data.message === 'Register successfully') {
      toast.success(data.message);
      navigate('/');
    } else {
      toast.error(data.message || 'Đăng ký thất bại.');
    }
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error.response?.data || error.message);
    toast.error('Đã xảy ra lỗi trong quá trình đăng ký.');
  }
};

    const handleGetBack = () => {
        navigate('/');
    };

    return (
        <div className="Register-container">
            <div className='contentModal'>
            <div className="title">
                <b>SIGN UP</b>
            </div>
            <div className="body">
                <form onSubmit={handleRegister}>
                    <div className='username'>
                        <label>UserName</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                            placeholder="Enter your username"
                            autoComplete="username"
                        />
                    </div>
                    <div className='email'>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </div>
                    <div className='phone'>
                        <label>Phone</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                            placeholder="Enter your phone number"
                            autoComplete="tel"
                        />
                    </div>
                    <div className='address'>
                        <label>Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            required
                            placeholder="Enter your address"
                            autoComplete="address"
                        />
                    </div>
                    <div className='password'>
                        <label>Password</label>
                        <input
                            type={type}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            placeholder="Enter your password"
                            autoComplete="new-password"
                        />
                        <span className="eye-icon" onClick={handleToggle}>
                            <FontAwesomeIcon icon={icon} size="lg" />
                        </span>
                    </div>
                </form>
            </div>
            <div className='buttonFoot'>
                <button className= "getback" onClick={handleGetBack}>
                    <div className='icon-wrapper'><FontAwesomeIcon icon={faCircleArrowLeft} />back</div>
                </button>
                <hr className='divider' />
                <button className='submit' type="submit" onClick={handleRegister}>Register</button>
            </div>
            </div>
        </div>
    );
};

export default SignUpPages;
