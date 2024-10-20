import axios from '../utils/axiosCustomize';


// Function để đăng nhập và lưu token
const Postlogin = async (email, password) => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    const { token } = response.data;
    // Lưu token vào localStorage
    localStorage.setItem('access_token', token);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    throw error;
  }
};
// Function để đăng ký người dùng mới
const PostRegister = async (username, email, password, phone, address) => {
  try {
    const response = await axios.post('/auth/register', { username, email, password, phone, address });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    throw error;
  }
};

// Function để xác thực token
const SendBackToken = async () => {
  try {
    const response = await axios.get('/token/verify-token'); // Gọi API xác thực token
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xác thực token:', error);
    throw error;
  }
};
const GetUserInfomation = async(id) => {
try {
    const response = await axios.get(`/user/getdataUser/${id}`); // Gọi API xác thực token
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    throw error;
  }
}
const addProduct = async (name, description, price, stock, kind, selectedFile) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('kind', kind); // Thêm trường kind vào formData
    if (selectedFile) {
        formData.append('image', selectedFile);
    }

    try {
        const response = await axios.post('/product/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in addProduct API call:', error.response ? error.response.data : error.message);
        throw error;
    }
};

 const getAllProducts = async () => {
  try {
    const response = await axios.get('/product/showAll');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const uploadAvatar = async (id, selectedFile) => {
  const formData = new FormData();
  formData.append('avatar', selectedFile); // Gửi file ảnh
  formData.append('id', id); // Gửi ID người dùng

  try {
    const response = await axios.post('/user/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error('Error uploading avatar:', error.response ? error.response.data : error.message);
    throw error; // Ném lỗi để xử lý ở component
  }
};

const addToCart = async (cartItem) => {
    const response = await axios.post('/cart/addOne', cartItem);
    return response.data;
};
const getCartByUserId = async (userId) => {
    try {
        const response = await axios.get(`/cart/getListCart/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy giỏ hàng:', error);
        throw error;
    }
};
const getProductById = async (productId) => {
    try {
        const response = await axios.get(`/product/showProductbyId/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
        throw error;
    }
};

const getCartItemQuantity = async (userId, productId) => {
    try {
        // Gửi yêu cầu GET đến API với userId và productId
        const response = await axios.get(`/cart/quantity/${userId}/${productId}`);
        // Trả về dữ liệu chứa số lượng sản phẩm
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy số lượng sản phẩm trong giỏ hàng:', error);
        throw error;  // Ném lỗi để có thể xử lý ở nơi gọi hàm
    }
};
const getTotalQuantityOfUser = async (userId) => {
    try {
        // Gửi yêu cầu GET đến API với userId và productId
        const response = await axios.get(`/cart/totalquantityofuser/${userId}`);
        // Trả về dữ liệu chứa số lượng sản phẩm
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy số lượng sản phẩm trong giỏ hàng:', error);
        throw error;  // Ném lỗi để có thể xử lý ở nơi gọi hàm
    }
};
const removeFromCart = async (userId, productId) => {
    try {
        const response = await axios.delete(`/cart/remove/${userId}/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
        throw error;
    }
};
const addOrder = async (orderData) => {
    try {
        const response = await axios.post('/order/addOrder', orderData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm đơn hàng:', error);
        throw error;
    }
};

// Function để lấy danh sách đơn hàng của người dùng
const getOrdersByUserId = async (userId) => {
    try {
        const response = await axios.get(`/order/getOrders/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        throw error;
    }
};

// Function để lấy chi tiết đơn hàng
const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`/order/orderDetail/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        throw error;
    }
};

const getAllProductByKind = async (kind) => {
  try {
    const response = await axios.get(`product/showAllByKind/${kind}`);
    return response.data;
  }catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        throw error;
    }
}
const seekproductbyname = async (name) => {
  try {
    const response = await axios.get(`product/searchProduct/${name}`);
    return response.data;
  }catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        throw error;
    }
}
// Export các hàm để sử dụng
export {
  Postlogin, SendBackToken, PostRegister,
  GetUserInfomation, addProduct, getAllProducts,
  uploadAvatar, addToCart, getCartByUserId,
  getProductById, getCartItemQuantity, getTotalQuantityOfUser,
  removeFromCart,
  addOrder, getOrderById, getOrdersByUserId, getAllProductByKind,
  seekproductbyname
};
