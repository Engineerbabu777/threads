import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRegisterRequests: state => {
      state.loading = true
      state.isAuthenticated = false
    },
    userRegistrationSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
    },
    userRegistrationFailed: (state, action) => {
      state.loading = false
      ;(state.isAuthenticated = false), (state.error = action.payload.error)
    },
    userLoadRequests: state => {
      state.loading = true
      state.isAuthenticated = false
    },
    userLoadSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
    },
    userLoadFailed: (state, action) => {
      state.loading = false
      ;(state.isAuthenticated = false), (state.error = action.payload.error)
    },
    userLoginRequest: state => {
      state.isAuthenticated = false;
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    userLoginFailed: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
      state.user = {};
    },
    userLogoutRequest: state => {
      state.loading = true;
    },
    userLogoutSuccess: state => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    userLogoutFailed: state => {
      state.loading = false;
    },
    clearErrors: (state, action) => {
      state.error = null
    }
  }
})

export const {
  userRegisterRequests,
  userRegistrationSuccess,
  userRegistrationFailed,
  userLoadRequests,
  userLoadSuccess,
  userLoadFailed,
  clearErrors,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailed,
  userLogoutFailed,
  userLogoutRequest,
  userLogoutSuccess,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
