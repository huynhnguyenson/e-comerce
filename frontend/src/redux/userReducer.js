// src/redux/reducers/userReducer.js
import { FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGOUT_SUCCESS } from './action/userAction';

const INITIAL_STATE = {
  account: {
    id: '',  // Thêm trường id
    username: '',
    email: '',
    role:'',
    token: '', // Thêm trường token nếu cần
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          id: action?.payload?.id || state?.account?.id, // Cập nhật id
          username: action?.payload?.username || state.account.username,
          email: action?.payload?.email || state.account.email,
          role: action?.payload?.role || state.account.role,
          token: action?.payload?.token || state.account.token, // Cập nhật token nếu có
        },
        isAuthenticated: true,
      };

    case FETCH_USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          id: '',
          username: '',
          email: '',
          role :'',
          token: '',
        },
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default userReducer;
