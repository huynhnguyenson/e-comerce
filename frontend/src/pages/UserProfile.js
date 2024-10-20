import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import { useSelector } from 'react-redux';
import Avatar from '../components/Avatar';
import { getCartByUserId, uploadAvatar } from '../services/api'; // Import hàm uploadAvatar
import Payment from './Payment';

const UserProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const userId = useSelector((state) => state.user.account.id);
    const userData = useSelector((state) => state.user.account);
    const [avatarUrl, setAvatarUrl] = useState(userData.avatar);
    const [username, setUsername] = useState(userData.username);
    const [cartItems, setCartItems] = useState([]);
    // Tạo state để lưu danh sách sản phẩm
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await uploadAvatar(userId, selectedFile);
            setMessage(response.message);
            const newAvatarUrl = URL.createObjectURL(selectedFile);
            setAvatarUrl(newAvatarUrl);
            handleModalClose();
        } catch (error) {
            setMessage('Lỗi khi tải lên avatar: ' + error.message);
        }
    };

    const fetchListProductIncartfromUser = async () => {
        try {
            let res = await getCartByUserId(userId); // Gọi API lấy dữ liệu
            console.log("check res list", res);
            setCartItems(res.cartItems || []); 
            console.log("check id product", cartItems);
        } catch (error) {
            console.error('Có lỗi khi lấy giỏ hàng:', error);
        }
    };
    useEffect(() => {
        if (avatarUrl) {
            // Có thể thêm logic nào đó nếu cần
        }
        if (userId) {
            fetchListProductIncartfromUser();
        }
    }, [avatarUrl,userId]);

    return (
        <div className="UserProfile">
            <div className='UserSection'>
                <div className='avatarandpen'>
                    <Avatar userId={userId} width="100px" height="100px" src={avatarUrl} /> 
                    <button onClick={handleModalOpen} className="editButton">✏️</button>
                </div>
                <div className='username'>{username}</div>
            </div>
            <div className='GoodsStatus'>
                <Payment/>
            </div>
            {isModalOpen && (
                <div className="modal" onClick={handleModalClose}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={handleModalClose}>&times;</span>
                        <h2>Cập nhật thông tin cá nhân</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Tên:
                                <input type="text" defaultValue={userData.username} />
                            </label>
                            <label>
                                Số điện thoại:
                                <input type="text" defaultValue={userData.phone} />
                            </label>
                            <label>
                                Địa chỉ:
                                <input type="text" defaultValue={userData.address} />
                            </label>
                            <label>
                                Avatar:
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                            </label>
                            <button type="submit">Cập nhật</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
