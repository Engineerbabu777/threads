import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
  error: null,
  notifications: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationRequest: state => {
      state.isLoading = true
    },
    getNotificationSuccess: (state, action) => {
      state.isLoading = false
      state.notifications = action.payload
    },
    getNotificationFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    clearErrors: state => {
      state.error = null
    }
  }
})

export const {
  getNotificationRequest,
  getNotificationSuccess,
  getNotificationFailed,
  clearErrors
} = notificationSlice.actions

export const notificationsReducer = notificationSlice.reducer;