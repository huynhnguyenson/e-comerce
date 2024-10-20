export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const FETCH_USER_LOGOUT_SUCCESS = 'FETCH_USER_LOGOUT_SUCCESS';
export const GET_USER_ID = 'GET_USER_ID';

export const dologin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data
  }
}

export const dologOut = (data) => {
  return {
    type: FETCH_USER_LOGOUT_SUCCESS,
    payload: data
  }
}

export const getPostUserID = (id) => {
  return {
    type: GET_USER_ID,
    payload: id,
  };
};
export const updateUserAvatar = (avatarUrl) => {
    return {
        type: 'UPDATE_USER_AVATAR',
        payload: avatarUrl,
    };
};
