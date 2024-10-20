import { useState, useEffect } from "react";
import { getTotalQuantityOfUser } from "../services/api"; // Đảm bảo rằng đường dẫn này đúng

const NotificNumber = ({ userId }) => {
    const [quantity, setQuantity] = useState(0); // Đặt tên state là "quantity"

    const fetchTotalQuantityCartOfUser = async () => {
        try {
            let res = await getTotalQuantityOfUser(userId);
            setQuantity(res.totalQuantity);
        } catch (error) {
            console.error('Có lỗi khi lấy số lượng sản phẩm:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchTotalQuantityCartOfUser(); // Lần gọi đầu tiên

            // Thiết lập interval để gọi lại hàm mỗi 0.3 giây
            const interval = setInterval(fetchTotalQuantityCartOfUser, 300); 

            // Dọn dẹp interval khi component unmount hoặc khi userId thay đổi
            return () => clearInterval(interval);
        }
    }, [userId]); // Gọi lại khi userId thay đổi

    return (
        <div>
            {quantity > 0 ? quantity : null} {/* Hiển thị số lượng sản phẩm nếu lớn hơn 0, ngược lại không hiển thị gì */}
        </div>
    );
};

export default NotificNumber;
