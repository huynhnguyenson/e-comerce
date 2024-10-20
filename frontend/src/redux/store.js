// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer'; // Chú ý đường dẫn đúng

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export { store };
