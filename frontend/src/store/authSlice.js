import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: sessionStorage.getItem('token'),
  userId: sessionStorage.getItem('userId')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('userId', action.payload.userId);
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
