import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducers'
import { postReducer } from './reducers/postReducer'
import { notificationsReducer } from './reducers/notificationsReducer'

const Store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    notifications: notificationsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default Store
